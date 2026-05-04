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
                    <img src="data:image/jpeg;base64,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" width="18" alt="" /> Google
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