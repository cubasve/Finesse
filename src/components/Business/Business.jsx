import React from 'react';

export default function Business(props) {

    const businessOptions = ['Sole proprietorship', 'Partnership', 'Corporation'];
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
                        <td>
                            <select>
                                {businessOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" placeholder="Company Value" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}