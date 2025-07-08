from fastapi import FastAPI, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models import Base, Prescripcion, PrescripcionPrincipio, Receta, PrincipioActivo, Entrega
from database import engine, get_session
from pydantic import BaseModel
from typing import List, Optional
import datetime as dt
import uuid

app = FastAPI()

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# ----------------------
# Pydantic Schemas
# ----------------------

class PrescripcionPrincipioCreate(BaseModel):
    id_principio: uuid.UUID
    duracion: str
    frecuencia: str

class PrescripcionCreate(BaseModel):
    id_medico: uuid.UUID
    id_paciente: uuid.UUID
    principios: List[PrescripcionPrincipioCreate]

# ----------------------
# Endpoints
# ----------------------


# Crear prescripcion
@app.post("/prescripcion")
async def crear_prescripcion(
    data: PrescripcionCreate, db: AsyncSession = Depends(get_session)
):
    prescripcion = Prescripcion(
        id_medico=data.id_medico,
        id_paciente=data.id_paciente
    )
    db.add(prescripcion)
    await db.flush()

    for principio in data.principios:
        item = PrescripcionPrincipio(
            id_prescripcion=prescripcion.id_prescripcion,
            id_principio=principio.id_principio,
            duracion=principio.duracion,
            frecuencia=principio.frecuencia
        )
        db.add(item)

    await db.commit()
    return {"id_prescripcion": prescripcion.id_prescripcion}

# Obtener prescripciones de 1 paciente
@app.get("/prescripcion/paciente/{id_paciente}")
async def obtener_prescripciones(
    id_paciente: uuid.UUID, db: AsyncSession = Depends(get_session)
):
    result = await db.execute(
        select(Prescripcion)
        .options(
            selectinload(Prescripcion.principios),
            selectinload(Prescripcion.medico),
            selectinload(Prescripcion.paciente)
        )
        .where(Prescripcion.id_paciente == id_paciente)
    )
    prescripciones = result.scalars().all()

    response = []
    for p in prescripciones:
        principios = [
            {
                "id_principio": pp.id_principio,
                "duracion": pp.duracion,
                "frecuencia": pp.frecuencia
            }
            for pp in p.principios
        ]
        response.append({
            "id_prescripcion": p.id_prescripcion,
            "id_medico": p.id_medico,
            "medico_nombre": p.medico.nombre if p.medico else None,
            "id_paciente": p.id_paciente,
            "paciente_nombre": p.paciente.nombre if p.paciente else None,
            "principios": principios
        })

    return response

# Obtener 1 prescripcion
@app.get("/prescripcion/{id_prescripcion}")
async def obtener_prescripcion(
    id_prescripcion: uuid.UUID, db: AsyncSession = Depends(get_session)
):
    result = await db.execute(
        select(Prescripcion)
        .options(
            selectinload(Prescripcion.principios),
            selectinload(Prescripcion.medico),
            selectinload(Prescripcion.paciente)
        )
        .where(Prescripcion.id_prescripcion == id_prescripcion)
    )
    p = result.scalars().first()

    if not p:
        raise HTTPException(status_code=404, detail="Prescripción no encontrada")

    principios = [
        {
            "id_principio": pp.id_principio,
            "duracion": pp.duracion,
            "frecuencia": pp.frecuencia
        }
        for pp in p.principios
    ]

    return {
        "id_prescripcion": p.id_prescripcion,
        "id_medico": p.id_medico,
        "medico_nombre": p.medico.nombre if p.medico else None,
        "id_paciente": p.id_paciente,
        "paciente_nombre": p.paciente.nombre if p.paciente else None,
        "principios": principios
    }

#Obtener todas las prescripciones
@app.get("/prescripcion")
async def obtener_todas_prescripciones(db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(Prescripcion)
        .options(
            selectinload(Prescripcion.principios),
            selectinload(Prescripcion.medico),
            selectinload(Prescripcion.paciente)
        )
    )
    prescripciones = result.scalars().all()

    response = []
    for p in prescripciones:
        principios = [
            {
                "id_principio": pp.id_principio,
                "duracion": pp.duracion,
                "frecuencia": pp.frecuencia
            }
            for pp in p.principios
        ]
        response.append({
            "id_prescripcion": p.id_prescripcion,
            "id_medico": p.id_medico,
            "medico_nombre": p.medico.nombre if p.medico else None,
            "id_paciente": p.id_paciente,
            "paciente_nombre": p.paciente.nombre if p.paciente else None,
            "principios": principios
        })

    return response

# Agregar 1 receta de la prescripcion
@app.post("/prescripcion/agregar-receta/{id_prescripcion}")
async def agregar_receta(id_prescripcion: uuid.UUID, db: AsyncSession = Depends(get_session)):
    # Buscar prescripción
    result = await db.execute(
        select(Prescripcion).where(Prescripcion.id_prescripcion == id_prescripcion)
    )
    prescripcion = result.scalar_one_or_none()

    if not prescripcion:
        raise HTTPException(status_code=404, detail="Prescripción no encontrada")

    receta = Receta(
        id_prescripcion=prescripcion.id_prescripcion,
        id_paciente=prescripcion.id_paciente,
        id_medico=prescripcion.id_medico,
        fecha_emision=dt.datetime.now(dt.timezone.utc),
        estado="pendiente"
    )
    db.add(receta)
    await db.commit()
    return {"mensaje": "Receta creada correctamente", "id_receta": receta.id_receta}


# Obtener todas las recetas
# Obtener todas las recetas
@app.get("/receta")
async def obtener_recetas(db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(Receta)
        .options(
            selectinload(Receta.medico),
            selectinload(Receta.paciente),
            selectinload(Receta.prescripcion)
                .selectinload(Prescripcion.principios)
                .selectinload(PrescripcionPrincipio.principio),
            selectinload(Receta.entrega),  # Agregado
            selectinload(Receta.entrega).selectinload(Entrega.funcionario)  # Para obtener nombre funcionario
        )
    )
    recetas = result.scalars().all()

    return [
        {
            "id_receta": r.id_receta,
            "id_prescripcion": r.id_prescripcion,
            "id_paciente": r.id_paciente,
            "nombre_paciente": r.paciente.nombre,
            "id_medico": r.id_medico,
            "nombre_medico": r.medico.nombre,
            "fecha_emision": r.fecha_emision,
            "estado": r.estado,
            "principios": [
                {
                    "id_principio": pp.id_principio,
                    "nombre": pp.principio.nombre,
                    "categoria": pp.principio.categoria,
                    "duracion": pp.duracion,
                    "frecuencia": pp.frecuencia
                }
                for pp in r.prescripcion.principios
            ] if r.prescripcion else [],
            # Información de entrega (puede ser None)
            "entrega": {
                "fecha": r.entrega.fecha if r.entrega else None,
                "estado": r.entrega.estado if r.entrega else None,
                "nombre_retiro": r.entrega.nombre_retiro if r.entrega else None,
                "rut_retiro": r.entrega.rut_retiro if r.entrega else None,
                "id_funcionario": r.entrega.id_funcionario if r.entrega else None,
                "nombre_funcionario": r.entrega.funcionario.nombre if r.entrega and r.entrega.funcionario else None
            }
        } for r in recetas
    ]


# Obtener 1 receta
@app.get("/receta/{id_receta}")
async def obtener_receta(id_receta: uuid.UUID, db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(Receta)
        .where(Receta.id_receta == id_receta)
        .options(
            selectinload(Receta.medico),
            selectinload(Receta.paciente),
            selectinload(Receta.prescripcion)
            .selectinload(Prescripcion.principios)
            .selectinload(PrescripcionPrincipio.principio)
        )
    )
    r = result.scalar_one_or_none()

    if not r:
        raise HTTPException(status_code=404, detail="Receta no encontrada")

    return {
        "id_receta": r.id_receta,
        "id_prescripcion": r.id_prescripcion,
        "id_paciente": r.id_paciente,
        "nombre_paciente": r.paciente.nombre,
        "id_medico": r.id_medico,
        "nombre_medico": r.medico.nombre,
        "fecha_emision": r.fecha_emision,
        "estado": r.estado,
        "principios": [
            {
                "id_principio": pp.id_principio,
                "nombre": pp.principio.nombre,
                "categoria": pp.principio.categoria,
                "duracion": pp.duracion,
                "frecuencia": pp.frecuencia
            }
            for pp in r.prescripcion.principios
        ] if r.prescripcion else []
    }


@app.post("/receta/entregar/{id_receta}")
async def entregar_receta(
    id_receta: uuid.UUID,
    nombre: str = Body(...),
    rut: str = Body(...),
    id_funcionario: uuid.UUID = Body(...),
    db: AsyncSession = Depends(get_session)
):
    # Verificar que la receta exista
    result = await db.execute(select(Receta).where(Receta.id_receta == id_receta))
    receta = result.scalar_one_or_none()

    if not receta:
        raise HTTPException(status_code=404, detail="Receta no encontrada")

    # Crear entrada en la tabla Entrega
    entrega = Entrega(
        id_receta=id_receta,
        id_funcionario=id_funcionario,
        fecha=dt.datetime.now(dt.timezone.utc),
        estado="entregada",
        nombre_retiro=nombre,
        rut_retiro=rut,
    )
    db.add(entrega)

    # También puedes actualizar el estado de la receta si deseas:
    receta.estado = "entregada"

    await db.commit()
    return {"mensaje": "Entrega registrada correctamente"}


