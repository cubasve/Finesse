import React, { Component } from 'react';

// export default function EarnedIncome(props) {
//     const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

//     //[state, setState] = useState(initialState)

//     //add additional state by calling useState multiple times
//     // const [level, setLevel] = useState(.55);
//     // const [charging, setCharging] = useState(false);
//     // const [batteryData, setBatteryData] = useState({
//     //     level: .55,
//     //     charging: true,
//     // });

//     const totalEarnedIncome = [];

//     const [earnedIncomeData, setEarnedIncomeData] = useState({
//         earnedIncomeType: '',
//         amountEarned: '',
//     });

//     // state = {
//     //     user: userService.getUser(),
//     //     earnedIncomeStreams: [],
//     //     newEarnedIncome: {
//     //       earnedIncome: '',
//     //       amountEarned: '',
//     //     }

//     //   }

//     const addEarnedIncome = () => {
//         console.log('ADD INCOME CLICKED');
//         this.setState(state => ({
//             earnedIncomeStreams: [...state.earnedIncomeStreams, state.newEarnedIncome],
//             //replace (not mutating) --> add newEarnedIncome onto pre-existing earnedIncomeStreams array
//             newEarnedIncome: { earnedIncome: '', amountEarned: '' }
//             //rest the inputs for better UX
//         }))
//     }

//     const handleChange = e => {
//         const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
//         this.setState({ newEarnedIncome: newEarnedIncome })
//     }

//     return (
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Earned</th>
//                         <th>$</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>
//                             <select
//                                 name="earnedIncome"
//                                 value={earnedIncomeData.earnedIncomeType}
//                                 onChange={props.handleChange}>
//                                 {earnedIncomeOptions.map((option) => (
//                                     <option key={option} value={option}>{option}</option>)
//                                 )}
//                             </select>
//                         </td>
//                         <td>$
//                             <input
//                                 name="amountEarned"
//                                 value={earnedIncomeData.amountEarned}
//                                 onChange={props.handleChange}
//                                 type="number"
//                                 min="0"
//                                 placeholder="Salary/Commissions"
//                             />
//                             <button onClick={props.addIncome}>+</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div >
//     )
// }

//-------------------------------------------------------------------------------------

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

export default class EarnedIncome extends Component {
    state = {
        totalEarnedIncome: [],
        newEarnedIncome: {
            earnedIncomeType: 'Job',
            amountEarned: '',
        }
    }

    addEarnedIncome = e => {
        // alert('ADD INCOME CLICKED');
        e.preventDefault();
        this.setState(state => ({
            totalEarnedIncome: [...state.totalEarnedIncome, state.newEarnedIncome],
            //replace (not mutating) --> add newEarnedIncome onto pre-existing totalEarnedIncome array
            newEarnedIncome: { earnedIncomeType: '', amountEarned: '' }
            //reset the inputs for better UX
        }));
    }

    handleChange = e => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        this.setState({ newEarnedIncome: newEarnedIncome })
    }

    render() {
        return (
            <section>
                <h4><span>Earned</span> <span>$</span></h4>
                {this.state.totalEarnedIncome.map(ei => (
                    <article key={ei.earnedIncomeType}>
                        <div>{ei.earnedIncomeType}</div>
                        <div>{ei.amountEarned}</div>
                    </article>
                ))}
                <form onSubmit={this.addEarnedIncome}>
                    <label>
                        <select
                            name="earnedIncomeType"
                            value={this.state.newEarnedIncome.earnedIncomeType}
                            onChange={this.handleChange}
                        >
                            {/* <option selected value="Job">Job</option>
                            <option value="Self-Employment">Self-Employment</option>
                            <option value="Other">Other</option> */}
                            {earnedIncomeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountEarned"
                            value={this.state.newEarnedIncome.amountEarned}
                            onChange={this.handleChange}
                            type="number"
                            min="0"
                            placeholder="Salary/Commission"
                        />
                    </label>
                    <button onClick={this.addEarnedIncome}>+</button>
                </form>
            </section >
        )
    }
}

// state = {
//     totalEarnedIncome: [],
//     newEarnedIncome: {
//         earnedIncomeType: '',
//         amountEarned: '',
//     }
// }