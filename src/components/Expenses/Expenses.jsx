import React from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';

export default function Expenses(props) {
    return (
        <div>
            Expenses
            <PayYourselfFirst />
            <table>
                <thead>
                    <tr>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                <option selected>Housing</option>
                                <option>Transportation</option>
                                <option>Kids</option>
                                <option>Entertainment</option>

                            /*Give the user the ability to add an expense */
                            </select>
                        </td>
                        <td>$<input type="number" min="0" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}