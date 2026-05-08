import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiYoutube, FiMail, FiMapPin } from 'react-icons/fi';
import './MyFooter.css';

const MyFooter = () => {
    return (
        <footer className="footer-custom">
            <Container>
                <Row className="gy-4">
                    {/* LOGO E MISSION */}
                    <Col lg={4} md={12}>
                        <div className="footer-brand">
                            <h2 className="logo-text">TYM<span>.</span></h2>
                            <p className="footer-description">
                                Eleviamo lo standard del movimento umano.
                                Programmazione d'élite per chi non accetta la mediocrità.
                            </p>
                            <div className="social-links">
                                <a href="#"><FiInstagram /></a>
                                <a href="#"><FiFacebook /></a>
                                <a href="#"><FiYoutube /></a>
                            </div>
                        </div>
                    </Col>

                    {/* LINK RAPIDI */}
                    <Col lg={2} md={4} className="ps-lg-5">
                        <h5 className="footer-title">Esplora</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/move">Metodo M.O.V.E.</Link></li>
                            <li><Link to="/about">Chi Sono</Link></li>
                            <li><Link to="/contact">Contatti</Link></li>
                        </ul>
                    </Col>

                    {/* CONTATTI */}
                    <Col lg={3} md={4}>
                        <h5 className="footer-title">Contatti</h5>
                        <ul className="footer-contact">
                            <li><FiMail className="me-2 text-red" /> info@tymperformance.it</li>
                            <li><FiMapPin className="me-2 text-red" />Watsapp - 3270066600</li>
                        </ul>
                    </Col>

                    {/* NEWSLETTER O CALL TO ACTION */}
                    <Col lg={3} md={4}>
                        <h5 className="footer-title">Rimani Aggiornato</h5>
                        <p className="small text-muted">Ricevi consigli tecnici ogni settimana.</p>
                        <div className="newsletter-box">
                            <input type="email" placeholder="La tua email" />
                            <button className="btn-send">INVIO</button>
                        </div>
                    </Col>
                </Row>

                <hr className="footer-divider" />

                <Row className="pb-4">
                    <Col md={6} className="text-center text-md-start">
                        <p className="copyright">© 2026 TYM Performance. All rights reserved.</p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <div className="legal-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Cookie Policy</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default MyFooter;