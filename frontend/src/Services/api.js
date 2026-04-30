const API_URL = "http://localhost:3000";

export const apiRequest = async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return;
        }
        return await response.json();
    } catch (err) {
        console.error("Errore API:", err);
        throw err;
    }
};