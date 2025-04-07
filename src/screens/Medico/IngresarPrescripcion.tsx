import { Button } from "../../components/ui/button";
import { Container, Form } from 'react-bootstrap';
import { Plus, ArrowLeftCircleIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const IngresarPrescripcion = () => {
    const navigate = useNavigate();
    return (
        <Container fluid>
            <div className="bg-white">
                <div className="bg-white">    
                    {/* Header */}
                    <div className="bg-white">
                        <div>
                            {/* Button */}
                            <Button
                                variant="ghost"
                                onClick={() => navigate("/medico")}
                            >
                            <ArrowLeftCircleIcon className="w-20 h-20"/>
                            </Button>
                            {/* Title */}
                            <div className="text-center">
                                <h1 className="text-xl font-semibold"> Emitir recetas </h1>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Body */}
            <div>
                <div className="align-items-center mb-3">
                    <div> <h5> Datos del paciente </h5> </div>
                    <hr />
                </div>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block"> Nombre </Form.Label>
                    <Form.Control className="p-3" placeholder="Ingresa nombre" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block"> RUT </Form.Label>
                    <Form.Control className="p-3" placeholder="Ingrese RUT" />
                </Form.Group>
                <div className="align-items-center mb-3">
                    <div> <h5> Prescripción </h5> </div>
                    <hr />
                </div>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block"> Medicamento </Form.Label>
                    <Form.Control className="p-3" placeholder="Ingrese medicamento" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block"> Duración </Form.Label>
                    <Form.Control className="p-3" placeholder="Ingrese duración" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block"> Frecuencia </Form.Label>
                    <Form.Control className="p-3" placeholder="Ingrese frecuencia" />
                </Form.Group>
                <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300" />
                <Button variant="secondary" size="icon" className="mx-4">
                    <Plus />
                </Button>
                <div className="flex-grow border-t border-gray-300" />
                </div>
                <div className="text-center mt-4">
                    <Button size="lg"> Guardar prescripción </Button>
                </div>
            </div> 
            {/* Footer (falta poner símbolos y poder navegar entre páginas al apretarlos)*/}
            <div className="d-flex justify-content-around border-top pt-2 mt-3 text-center text-muted" style={{ position: 'fixed', bottom: 0, width: '100%', background: '#f8f9fa' }}>
                <div style={{ fontSize: '0.75rem' }}> Stock </div>
                <div style={{ fontSize: '0.75rem' }}> Prescripciones </div>
                <div style={{ fontSize: '0.75rem' }}> Recetas </div>
            </div>
        </Container>
    );
};

export default IngresarPrescripcion;
