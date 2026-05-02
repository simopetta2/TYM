import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/dashboard');
        }
    }, [location, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Credenziali errate');
            }
        } catch (err) {
            setError('Errore di connessione al server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Accedi</h2>
                {error && <div style={styles.errorBadge}>{error}</div>}
                <form onSubmit={handleLogin} style={styles.form}>
                    <input name="email" type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={styles.input} />
                    <input name="password" type="password" placeholder="Password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={styles.input} />
                    <button type="submit" disabled={loading} style={styles.button}>{loading ? '...' : 'Login'}</button>
                </form>
                <div style={styles.divider}><span>o</span></div>
                <button onClick={() => window.location.href = 'http://localhost:3000/auth/google'} style={styles.googleButton}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google__G__Logo.svg" width="18" alt="" /> Google
                </button>
                <p style={styles.footer}>Nuovo utente? <span onClick={() => navigate('/register')} style={styles.link}>Registrati</span></p>
            </div>
        </div>
    );
};
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' },
    card: { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    title: { marginBottom: '20px', color: '#333' },
    form: { display: 'flex', flexDirection: 'column', gap: '12px' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' },
    inputHalf: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '50%' },
    button: { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
    googleButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer' },
    avatarZone: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
    circle: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    linkLabel: { fontSize: '12px', color: '#007bff', cursor: 'pointer' },
    footer: { marginTop: '15px', fontSize: '14px' },
    link: { color: '#007bff', cursor: 'pointer', fontWeight: 'bold' },
    divider: { margin: '15px 0', color: '#aaa', fontSize: '12px' },
    errorBadge: { color: 'red', fontSize: '13px', marginBottom: '10px' }
};
export default LoginPage