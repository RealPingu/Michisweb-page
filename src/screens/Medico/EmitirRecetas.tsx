import { Button } from "../../components/ui/button";
import { Container, Form } from 'react-bootstrap';
import { ArrowLeftCircleIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmitirRecetas = () => {
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
                    <div> <h5> Medicamentos </h5> </div>
                    <hr />
                </div>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block"> Prescripción asociada </Form.Label>
                    <Form.Select>
                        <option> Selecciona una prescripción </option>
                        <option value="antibiotico"> Antibiótico </option>
                        <option value="analgesico"> Analgésico </option>
                        <option value="antihistaminico"> Antihistamínico </option>
                    </Form.Select>
                </Form.Group>
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

export default EmitirRecetas;
