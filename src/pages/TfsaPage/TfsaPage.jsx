// import React, { useState } from 'react';

// const TFSAOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

// export default function TfsaPage() {
//     const [allInvestments, setAllInvestments] = useState([]);
//     const [newInvestment, setNewInvestment] = useState({
//         principal: '',
//         type: '', //Paper assets: mutual funds, index funds, stocks, ETFs, GIC, REITS
//         year: '', //could be date too
//     });

//     return (
//         <>
//             TFSA
//             <form>
//                 <input
//                     placeholder='Principal'
//                     value={newInvestment.principal}
//                     // onChange={}
//                 />
//                 {/* <select value={newInvestment.type}>
//                     {TFSAOptions.map(option => {
//                         <option key={option} value={option}>{option}</option>
//                     })}
//                 </select> */}
//                 <input
//                     placeholder='Contribution Year'
//                     value={newInvestment.year}
//                 />
//             </form>
//         </>
//     );
// }
