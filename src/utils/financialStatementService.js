import tokenService from './tokenService';


const BASE_URL = '/api/financialstatements';

export default {
    index,
    create,
}

function index() {
    //------------------------------------
    //I added this section
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify()
    }
    //=====--------------------------------
    return fetch(BASE_URL, options).then(res => res.json());
}
//Would I put my show function here? show fn is populating user's data - so it saves
//user.userFinances as parameter?

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


//Send state data as JSON in req.body
//const { earnedIncomeType, amountEarned } = this.state.totalEarnedIncome;
//const body = { earnedIncomeType, amountEarned };
//const json = JSON.stringify(body)
//console.log(json)

// state = {
//     totalEarnedIncome: [],
//     newEarnedIncome: {
//         earnedIncomeType: 'Job',
//         amountEarned: '',
//     },
// }


//PATH: component --> serviceWorker --> API route using fetch --> controller fn --> re-render/redirect
//send request but it is defined in routes (Express)