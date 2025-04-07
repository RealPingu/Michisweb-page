import { Button } from "../../components/ui/button";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaArrowLeft, FaCapsules, FaBell, FaFileMedical } from 'react-icons/fa';
import { Plus } from "lucide-react";

export const IngresarPrescripcion = () => {
    return (
        <Container className="p-3">
            <Row className="align-items-center mb-3">
                <Col xs="auto"> <FaArrowLeft size={24}/> </Col>
                <Col className="text-center"> <h5> Ingresar prescripcion </h5> </Col>
                <hr />
            </Row>

            <Row className="align-items-center mb-3">
                <Col> <h5> Datos del paciente </h5> </Col>
                <hr />
            </Row>

            <Form.Group className="mb-3">
                <Form.Label className="d-block"> Nombre </Form.Label>
                <Form.Control className="p-3" placeholder="Ingresa nombre" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="d-block"> RUT </Form.Label>
                <Form.Control className="p-3" placeholder="Ingrese RUT" />
            </Form.Group>

            <Row className="align-items-center mb-3">
                <Col> <h5> Prescripción </h5> </Col>
                <hr />
            </Row>

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
                <Button variant="primary" size="lg"> Guardar prescripción </Button>
            </div>

            <div className="d-flex justify-content-around border-top pt-2 mt-3 text-center text-muted" style={{ position: 'fixed', bottom: 0, width: '100%', background: '#f8f9fa' }}>
            <div>
            <FaCapsules /><div style={{ fontSize: '0.75rem' }}>Stock</div>
            </div>
            <div>
            <FaFileMedical /><div style={{ fontSize: '0.75rem' }}>Prescripciones</div>
            </div>
            <div>
            <FaBell /><div style={{ fontSize: '0.75rem' }}>Recetas</div>
            </div>
      </div>
        </Container>
    );
};

export default IngresarPrescripcion;
