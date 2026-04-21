import { redirect } from 'react-router-dom';

export function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
}

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    if (!storedExpirationDate) {
        return 0;
    }

    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        clearAuthData();
        return null;
    }

    return token;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}
