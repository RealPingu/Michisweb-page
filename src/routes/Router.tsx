import { createBrowserRouter } from "react-router-dom";
import { Login } from "../screens/Login/Login";
import { MenuFuncionario } from "../screens/Funcionario/Menu";
import { MenuMedico } from "../screens/Medico/Menu";
import { RevisarStock } from "../screens/Medico/RevisarStock";
import { EmitirRecetas } from "../screens/Medico/EmitirRecetas";
import { IngresarPrescripcion } from "../screens/Medico/IngresarPrescripcion";
import { IngresarMedicamentos } from "../screens/Funcionario/Stock/IngresarMedicamentos";
import { RegistrarEntrega } from "../screens/Funcionario/Stock/RegistrarEntrega";
import { EmitirInformes } from "../screens/Funcionario/Stock/EmitirInformes";
import { Informes } from "../screens/Funcionario/Stock/Informes/Informes";
import { BajaMedicamentos } from "../screens/Funcionario/Stock/BajaMedicamentos";
import { BajaDetalle } from "../screens/Funcionario/Stock/BajaDetalle/BajaDetalle";
import { Prescripciones } from "../screens/Funcionario/Prescripciones/Prescripciones";
import { PrescripcionesPendientes } from "../screens/Funcionario/Prescripciones/PrescripcionesPendientes";
import { Reservas } from "../screens/Funcionario/Reserva/Reservas";
import { Reservar } from "../screens/Funcionario/Reserva/Reservar"
import { MenuStock } from "../screens/Funcionario/Stock/Menu";
import { AgregarPaciente } from "../screens/Medico/CrearPaciente";

export const Router = createBrowserRouter([
  { path: "/", element: <Login /> },

  { path: "/funcionario", element: <MenuFuncionario /> },
  { path: "/funcionario/stock", element: <MenuStock /> },
  { path: "/funcionario/stock/ingresar-medicamentos", element: <IngresarMedicamentos /> },
  { path: "/funcionario/stock/registrar-entrega", element: <RegistrarEntrega /> },
  { path: "/funcionario/stock/emitir-informes", element: <EmitirInformes /> },
  { path: "/funcionario/stock/emitir-informes/informes", element: <Informes /> },
  { path: "/funcionario/stock/baja-medicamentos", element: <BajaMedicamentos /> },
  { path: "/funcionario/stock/baja-medicamentos/:id", element: <BajaDetalle /> },
  { path: "/funcionario/prescripciones", element: <Prescripciones /> },
  { path: "/funcionario/prescripciones/pendientes", element: <PrescripcionesPendientes /> },
  { path: "/funcionario/prescripciones/reservas", element: <Reservas /> },
  { path: "/funcionario/prescripciones/reservas/reservar", element: <Reservar /> },

  { path: "/medico", element: <MenuMedico /> },
  { path: "/medico/revisar-stock", element: <RevisarStock /> },
  { path: "/medico/emitir-recetas", element: <EmitirRecetas /> },
  { path: "/medico/ingresar-prescripcion", element: <IngresarPrescripcion /> },
  { path: "/medico/agregar-paciente", element: <AgregarPaciente />},
]);
