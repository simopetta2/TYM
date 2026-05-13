import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArrowRightShort } from 'react-bootstrap-icons';

const infoMethod = () => {
    const navigate = useNavigate();

    return (
        <Container className="py-5">

            <div className="text-center mb-5">


                <h1 className="fw-bold display-4 mb-4 mt-2">A Chi Mi Rivolgo</h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: '700px', lineHeight: '1.6' }}>
                    Lavoro con persone attive e sportivi amatoriali che vogliono migliorare
                    il proprio corpo in modo consapevole, strutturato e sostenibile.
                </p>
            </div>

            <Row className="justify-content-center g-4">


                <Col md={10} lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden" style={{ borderLeft: '6px solid #e5383b !important' }}>
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="fw-bold mb-4 h3">Persone Attive con Rigidità</h2>
                            <ul className="list-unstyled fs-5 text-muted">
                                <li className="mb-3 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Ti alleni o lavori molto ma senti rigidità</span>
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Convivi con fastidi ricorrenti</span>
                                </li>
                                <li className="mb-0 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Vuoi capire come muoverti meglio</span>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>


                <Col md={10} lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden" style={{ borderLeft: '6px solid #e5383b !important' }}>
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="fw-bold mb-4 h3">Sportivi Amatoriali</h2>
                            <ul className="list-unstyled fs-5 text-muted">
                                <li className="mb-3 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Vuoi migliorare le tue prestazioni</span>
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Cerchi programmazione intelligente</span>
                                </li>
                                <li className="mb-0 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Hai bisogno di recuperare meglio</span>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>


                <Col md={10} lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden" style={{ borderLeft: '6px solid #e5383b !important' }}>
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="fw-bold mb-4 h3">Chi Vuole Allenarsi Meglio</h2>
                            <ul className="list-unstyled fs-5 text-muted">
                                <li className="mb-3 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Non solo allenarsi di più</span>
                                </li>
                                <li className="mb-0 d-flex align-items-start">
                                    <ArrowRightShort className="text-danger me-2 mt-1" size={28} />
                                    <span>Costruire capacità durature</span>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>


            <div className="text-center mt-5 pt-4">
                <p className="text-muted italic">
                    "Il segreto del progresso è iniziare."
                </p>
                <Button
                    variant="outline-dark"
                    className="rounded-pill px-4 fw-bold shadow-sm"
                    onClick={() => navigate('/register')}
                >
                    Unisciti alla Community
                </Button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .card {
            border-left: 8px solid #e5383b !important;
            transition: transform 0.2s ease;
        }
        .card:hover {
            transform: translateX(10px);
        }
      `}} />
        </Container>
    );
};

export default infoMethod;