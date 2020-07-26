const BASE_URL = '/api/users/';


// function login(creds) {
//     return fetch(BASE_URL + 'login', {
//         method: 'POST',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//         body: JSON.stringify(creds),
//     })
//         .then((res) => {
//             if (res.ok) return res.json();
//             throw new Error('Bad Credentials');
//         })
//         .then(({ token }) => {
//             tokenService.setToken(token);
//         });
// }

// export default {
//     login,
// };