import React from 'react';

export default function Business(props) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Business</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input placeholder="Sector" /></td>
                        <td>$<input type="number" min="0" placeholder="Value of Company" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}