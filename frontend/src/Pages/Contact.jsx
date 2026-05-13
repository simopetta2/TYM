import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { EnvelopePaper, Telephone, GeoAlt, SendCheck } from 'react-bootstrap-icons';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.reload()
        alert("Messaggio inviato con successo!");
    };

    return (
        <Container className="py-5" style={{ minHeight: '80vh' }}>

            <Row className="mb-5 text-center">
                <Col lg={8} className="mx-auto">
                    <h6 className="text-danger fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>Contattaci</h6>
                    <h1 className="display-4 fw-black text-dark" style={{ letterSpacing: '-2px' }}>
                        HAI DOMANDE? <span style={{ color: '#e5383b' }}>SCRIVICI.</span>
                    </h1>
                    <p className="text-muted fs-5">
                        Siamo qui per aiutarti a ottimizzare il tuo allenamento. Riceverai una risposta entro 24 ore lavorative.
                    </p>
                </Col>
            </Row>

            <Row className="gy-4">

                <Col lg={4}>
                    <div className="d-flex flex-column gap-4">


                        <Card className="border-0 shadow-sm rounded-4 p-3">
                            <Card.Body className="d-flex align-items-center gap-3">
                                <div className="bg-light p-3 rounded-circle text-danger">
                                    <Telephone size={24} />
                                </div>
                                <div>
                                    <p className="small text-muted m-0">Chiamaci</p>
                                    <p className="fw-bold m-0 text-dark">+39 012 345 6789</p>
                                </div>
                            </Card.Body>
                        </Card>


                        <Card className="border-0 shadow-sm rounded-4 p-3">
                            <Card.Body className="d-flex align-items-center gap-3">
                                <div className="bg-light p-3 rounded-circle text-danger">
                                    <EnvelopePaper size={24} />
                                </div>
                                <div>
                                    <p className="small text-muted m-0">Email</p>
                                    <p className="fw-bold m-0 text-dark">info@tymperformance.it</p>
                                </div>
                            </Card.Body>
                        </Card>


                        <Card className="border-0 shadow-sm rounded-4 p-3">
                            <Card.Body className="d-flex align-items-center gap-3">
                                <div className="bg-light p-3 rounded-circle text-danger">
                                    <GeoAlt size={24} />
                                </div>
                                <div>
                                    <p className="small text-muted m-0">Vienici a trovare</p>
                                    <p className="fw-bold m-0 text-dark">Via Roma 123, Milano</p>
                                </div>
                            </Card.Body>
                        </Card>

                    </div>
                </Col>


                <Col lg={8}>
                    <Card className="border-0 shadow-lg rounded-4 p-4 p-md-5">
                        <Form onSubmit={handleSubmit}>
                            <Row className="gy-4">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold small">Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Il tuo nome"
                                            className="form-input py-2 border-0 bg-light"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold small">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="La tua email"
                                            className="form-input py-2 border-0 bg-light"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold small">Oggetto</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Come possiamo aiutarti?"
                                            className="form-input py-2 border-0 bg-light"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold small">Messaggio</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Scrivi qui il tuo messaggio..."
                                            className="form-input py-2 border-0 bg-light"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12} className="text-end">
                                    <Button
                                        type="submit"
                                        variant="danger"
                                        className="rounded-pill px-5 py-3 fw-bold shadow-sm d-flex align-items-center gap-2 ms-auto"
                                        style={{ backgroundColor: '#e5383b' }}
                                    >
                                        INVIA MESSAGGIO <SendCheck size={20} />
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>



            <style>{`
        .fw-black { font-weight: 900; }
        .form-input:focus {
          background-color: #fff !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05) !important;
          border: 1px solid #e5383b !important;
        }
        .card {
            transition: all 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
        }
      `}</style>
        </Container>
    );
};

export default Contact;