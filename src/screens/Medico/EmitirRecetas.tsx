import { Button } from "../../components/ui/button";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaArrowLeft, FaCapsules, FaBell, FaFileMedical } from 'react-icons/fa';

export const EmitirRecetas = () => {
    return (
        <Container className="p-3">
            <Row className="align-items-center mb-3">
                <Col xs="auto"> <FaArrowLeft size={24}/> </Col>
                <Col className="text-center"> <h5> Emitir receta </h5> </Col>
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
                <Col> <h5> Medicamentos </h5> </Col>
                <hr />
            </Row>

            <Form.Group className="mb-3">
            <Form.Label className="d-block"> Prescripción asociada </Form.Label>
            <Form.Select>
                <option>Selecciona una categoría</option>
                <option value="antibiotico"> Antibiótico </option>
                <option value="analgesico"> Analgésico </option>
                <option value="antihistaminico"> Antihistamínico </option>
            </Form.Select>
            </Form.Group>

            <div className="text-center mt-4">
                <Button variant="primary" size="lg"> Emitir receta </Button>
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

export default EmitirRecetas;
