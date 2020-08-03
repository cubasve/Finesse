function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        //Check if token is expired, remove if it is
        const payload = JSON.parse(atob(token.split('.')[1]));

        //JWT's exp is expressed in seconds (not ms) so have to convert
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
    localStorage.removeItem('token');
}

export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken,
}