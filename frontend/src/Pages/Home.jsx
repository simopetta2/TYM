import { Button } from 'react-bootstrap';
import { BrowserRouter as Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Nav, Container, } from 'react-bootstrap';
import './Home.css';
import { Router } from 'react-router-dom';

const Home = () => {
    return (
        <section className="hero-background">
            <div className="hero-content">
                <h1 className="hero-title">
                    Migliora la qualità del tuo
                    <span style={{ color: '#e5383b' }}> <u> movimento.</u></span> <br />
                    Migliora le tue prestazioni fisiche.
                </h1>

                <p className="hero-text">
                    Programmazione funzionale per persone attive e sportivi amatoriali
                    che vogliono allenarsi meglio, muoversi in modo più efficiente e
                    migliorare la performance in modo sostenibile.
                </p>

                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                    <Nav.Link as={Link} to="/move"><Button className="btn-tym-red">
                        Scopri il Metodo M.O.V.E.
                    </Button></Nav.Link>
                    <Button className="btn-tym-outline">
                        Approfondisci l'Approccio
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Home;
