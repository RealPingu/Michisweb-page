import React, { useRef } from 'react';

// Define la interfaz para las props del componente
interface RecetaProps {
  nombrePaciente: string;
  edad: string;
  direccion: string;
  ciudad: string;
  ci: string;
}

const Receta: React.FC<RecetaProps> = ({ nombrePaciente, edad, direccion, ciudad, ci }) => {
  const targetRef = useRef(null);

  return (
    <div
      style={{ width: '210mm' }}
      ref={targetRef}
    >
      {/* Título centrado */}
      <div className="text-center text-xl font-bold my-4">RECETA</div>
      <div className="container p-4">
        <hr className="border-t-4 border-blue-600 mt-4" />
        {/* Header */}
        <h3 className="text-center text-lg font-semibold mb-2">DATOS DEL PROFESIONAL</h3>
        <div className="header p-4 rounded">
          {/* Tabla fecha */}
          <table className="table-fixed border border-black text-center text-sm w-1/2">
            <thead>
              <tr>
                <th className="border border-black px-4 py-1">DÍA</th>
                <th className="border border-black px-4 py-1">MES</th>
                <th className="border border-black px-4 py-1">AÑO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black h-8"></td>
                <td className="border border-black h-8"></td>
                <td className="border border-black h-8"></td>
              </tr>
            </tbody>
          </table>

          {/* Datos */}
          <div className="space-y-3 text-sm w-full">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <span className="pr-2">Nombre Paciente:</span>
                <span>{nombrePaciente}</span>
              </div>
              <div className="w-32">
                <span className="pr-1">Edad:</span>
                <span>{edad}</span>
              </div>
            </div>
            <div>
              <span className="pr-2">Dirección:</span>
              <span>{direccion}</span>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <span className="pr-2">Ciudad:</span>
                <span>{ciudad}</span>
              </div>
              <div className="w-52">
                <span className="pr-1">CI:</span>
                <span>{ci}</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t-4 border-blue-600 mt-4" />
        {/* Cuerpo receta */}
        <div className="rp font-bold mt-4">Rp:</div>
        <div className="p-10">
          <div className="contenido mt-2 text-sm">
            <i>Marca comercial</i><br />
            <span className="generico font-semibold">NOMBRE GENÉRICO</span><br /><br />
            Tabletas de 500 mg.<br /><br />
            <b>Tomar 1 tableta cada 12 horas<br />durante 14 días.</b><br /><br />
            <span className="generico font-semibold">TOTAL 28 UNIDADES</span>
          </div>
        </div>
        <div className="firma mt-8 font-medium text-right">FIRMA MÉDICO</div>
        {/* Footer */}
        <div className="w-full text-xs text-gray-500 text-center py-2 mt-8">
          IMPRENTA • RUT • DIRECCIÓN • TELÉFONO
        </div>
      </div>
    </div>
  );
};

export default Receta;