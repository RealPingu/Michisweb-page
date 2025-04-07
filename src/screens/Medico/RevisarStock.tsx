import { Button } from "../../components/ui/button";
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { FaArrowLeft, FaSearch, FaCapsules, FaBell, FaFileMedical } from 'react-icons/fa';
import loratadinaImg from './Loratadina.jpg';

const productos = [
    {
      nombre: 'Loratadina1',
      stock: '10mg comprimidos',
      descripcion: 'Loratadina 10mg comprimidos vía oral',
      imagen: loratadinaImg, // imagen de prueba
    },
    {
        nombre: 'Loratadina2',
        stock: '10mg comprimidos',
        descripcion: 'Loratadina 10mg comprimidos vía oral',
        imagen: loratadinaImg, // imagen de prueba
    },
    {
        nombre: 'Loratadina3',
        stock: '10mg comprimidos',
        descripcion: 'Loratadina 10mg comprimidos vía oral',
        imagen: loratadinaImg, // imagen de prueba
    },
];

export const RevisarStock = () => {
    return (
        <Container className="p-3">
            <Row className="align-items-center mb-3">
                <Col xs="auto"> <FaArrowLeft size={24}/> </Col>
                <Col className="text-center"> <h5> Revisar stock </h5> </Col>
                <hr />
            </Row>

            <InputGroup className="mb-3 text-center">
                <Form.Control className="p-3" placeholder="Buscar medicamento" />
                <Button className="p-3" variant="light"><FaSearch /></Button>
            </InputGroup>

            <Row>
                {productos.map((med, idx) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={idx}>
                        <Card className="mb-3 shadow-sm">
                            <Card.Img variant="top" src={med.imagen} />
                            <Card.Body>
                                <Card.Title>{med.nombre}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Stock</Card.Subtitle>
                                <Card.Text>{med.descripcion}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

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

export default RevisarStock;
