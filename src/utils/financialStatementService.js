import tokenService from './tokenService';

const BASE_URL = '/api/financialstatements';

export default {
    index,
    create,
}

function index() {
    return fetch(BASE_URL).then(res => res.json());
}

function create(financialStatement) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(financialStatement)
    }
    return fetch(BASE_URL, options).then(res => res.json());
}

//PATH: component --> serviceWorker --> API route using fetch --> controller fn --> re-render/redirect
//send request but it is defined in routes (Express)