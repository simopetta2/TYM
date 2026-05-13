import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import { Navigate, useNavigate } from 'react-router-dom';

const MoveMethod = () => {
    const navigate = useNavigate()
    return (
        <Container className="py-5">

            <div className="text-center mb-5">
                <h1 className="fw-bold display-3 mb-3">Il Metodo <span className="text-danger">M.O.V.E.</span></h1>
                <p className="lead text-muted mx-auto fw-semibold" style={{ maxWidth: '850px' }}>
                    Il mio lavoro si basa su un approccio funzionale e progressivo, che mette al centro il movimento di base,
                    il recupero funzionale e la performance applicata.
                </p>
                <div className="bg-danger mx-auto" style={{ height: '5px', width: '100px', borderRadius: '10px' }}></div>
            </div>

            <Row className="g-5">

                <Col xs={12} md={6}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Row className="g-0 align-items-center">
                            <Col md={4} className="bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '250px' }}>
                                <span className="display-1 fw-black text-danger" style={{ fontSize: '10rem', lineHeight: 1 }}>M</span>
                            </Col>
                            <Col md={8}>
                                <Card.Body className="p-4 p-lg-5">
                                    <h2 className="fw-bold text-dark mb-3">Movimento di Base</h2>
                                    <p className="fs-5 text-muted">
                                        Analisi e ottimizzazione degli schemi motori fondamentali. Prima di caricare il movimento,
                                        dobbiamo assicurarci che il corpo si muova correttamente nello spazio senza compensazioni.
                                    </p>

                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Row className="g-0 align-items-center ">
                            <Col md={4} className="bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '250px' }}>
                                <span className="display-1 fw-black text-danger" style={{ fontSize: '10rem', lineHeight: 1 }}>O</span>
                            </Col>
                            <Col md={8}>
                                <Card.Body className="p-4 p-lg-5 text-md-end">
                                    <h2 className="fw-bold text-dark mb-3">Ottimizzazione Articolare</h2>
                                    <p className="fs-5 text-muted">
                                        Focus sulla mobilità e sulla stabilità articolare. Un corpo fluido è un corpo che
                                        previene gli infortuni e permette una maggiore espressione di forza.
                                    </p>

                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col xs={12} md={6}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Row className="g-0 align-items-center">
                            <Col md={4} className="bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '250px' }}>
                                <span className="display-1 fw-black text-danger" style={{ fontSize: '10rem', lineHeight: 1 }}>V</span>
                            </Col>
                            <Col md={8}>
                                <Card.Body className="p-4 p-lg-5">
                                    <h2 className="fw-bold text-dark mb-3">Valutazione Progressiva</h2>
                                    <p className="fs-5 text-muted">
                                        Monitoraggio costante dei dati. Non andiamo a sensazione: ogni carico, ripetizione e
                                        miglioramento della mobilità viene tracciato per garantire risultati costanti nel tempo.
                                    </p>

                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>





                <Col xs={12} md={6}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Row className="g-0 align-items-center ">
                            <Col md={4} className="bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '250px' }}>
                                <span className="display-1 fw-black text-danger" style={{ fontSize: '10rem', lineHeight: 1 }}>E</span>
                            </Col>
                            <Col md={8}>
                                <Card.Body className="p-4 p-lg-5 text-md-end">
                                    <h2 className="fw-bold text-dark mb-3">Efficienza Sportiva</h2>
                                    <p className="fs-5 text-muted">
                                        Il culmine del metodo: trasformare il potenziale atletico in performance pura,
                                        specifica per il tuo obiettivo o la tua disciplina sportiva.
                                    </p>

                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>


            <div className="mt-5 p-5 bg-dark text-white rounded-4 text-center shadow-lg">
                <h2 className="fw-bold mb-3">Non allenarti a caso.</h2>
                <p className="lead mb-4 opacity-75">Applica un metodo scientifico basato sul movimento.</p>
                <button onClick={() => navigate('/info-method')} className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-bold shadow">
                    SCOPRI DI PIU'
                </button>
            </div>

            <style>{`
        .fw-black { font-weight: 900; }
        .card { transition: all 0.3s ease; }
        .card:hover { transform: scale(1.01); box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important; }
      `}</style>
        </Container>
    );
};

export default MoveMethod;