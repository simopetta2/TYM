import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiTarget, FiZap, FiActivity } from 'react-icons/fi';
import './Home.css';

const Home = () => {
    return (
        <div className="home-wrapper">

            <section className="hero-fullscreen">
                <div className="overlay-dark"></div>
                <Container className="hero-inner">
                    <div className="badge-premium">Performance Coaching 2026</div>
                    <h1 className="display-1 fw-black">
                        NON SOLO <span className="text-red">ALLENAMENTO.</span><br />
                        SOLO <span className="text-outline">RISULTATI.</span>
                    </h1>
                    <p className="lead-text">
                        Programmazione d'élite per atleti e amatori che esigono il massimo.
                        Smetti di muoverti a caso. Inizia a performare.
                    </p>
                    <div className="cta-group">
                        <Button as={Link} to="/move" className="btn-main btn-danger">
                            ENTRA NEL METODO M.O.V.E.
                        </Button>
                        <Button variant="link" className="btn-secondary-custom">
                            Guarda i risultati →
                        </Button>
                    </div>
                </Container>
            </section>


            <section className="features-grid">
                <Container>
                    <Row>
                        <Col md={4} className="feature-item">
                            <FiTarget className="feat-icon" />
                            <h3>Precisione</h3>
                            <p>Ogni movimento è analizzato per massimizzare il guadagno e annullare il rischio.</p>
                        </Col>
                        <Col md={4} className="feature-item">
                            <FiZap className="feat-icon" />
                            <h3>Efficienza</h3>
                            <p>Ottieni di più in meno tempo. Programmi ottimizzati per la tua vita frenetica.</p>
                        </Col>
                        <Col md={4} className="feature-item">
                            <FiActivity className="feat-icon" />
                            <h3>Longevità</h3>
                            <p>Allenati oggi per essere più forte domani. Metodo sostenibile al 100%.</p>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className="manifesto-section">
                <Container>
                    <div className="manifesto-card">
                        <span className="quote-mark">“</span>
                        <h2>Allenarsi meglio viene prima di allenarsi di più.</h2>
                        <p>La qualità batte la quantità, sempre. Gestione dei carichi, tecnica impeccabile e programmazione intelligente: questa è la base della tua nuova forma fisica.</p>
                        <Button className="btn-outline-red btn-danger">SCOPRI LA MIA FILOSOFIA</Button>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Home;