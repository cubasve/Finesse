import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

export default function EarnedIncome(props) {

    // handleUpdate = async (e) => {
    //     try {
    //         // const updateIncome = {
    //         //     id: e.target.value,
    //         //     // amount: this.state.totalEarnedIncome.amount, //undefined
    //         //     // type: this.state.totalEarnedIncome.type //undefined
    //         //     amount: this.state.newEarnedIncome.amount, //" "
    //         //     type: this.state.newEarnedIncome.type, //"Job"
    //         // }
    //         //console.log(updateIncome)

    //         // const x = { id: e.target.value, amount: e.target.name }
    //         // console.log(x)

    //         await financialStatementService.update({ id: e.target.value, amount: e.target.name })
    //             .then(data => console.log(data.user.userFinances)) //user object
    //         // .then((data) => this.setState({ totalEarnedIncome: data.userFinances })) //state = data
    //         //.then(data => console.log(data))
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // handleDelete = async (e) => {
    //     let selectedIndex = this.state.totalEarnedIncome.findIndex(index => (index._id === e.target.value));
    //     console.log(selectedIndex)
    //     //let earnedIncomeArray = [];
    //     //let removedIncome = this.state.totalEarnedIncome.splice(selectedIndex, 1);

    //     // function isEarned(elem) {
    //     //     return elem.category === 'Earned'
    //     // }

    //     try {
    //         await financialStatementService.deleteOne({ id: e.target.value })
    //             .then(data => {
    //                 this.setState({
    //                     totalEarnedIncome: data.user.userFinances
    //                         // .splice(selectedIndex, 1)
    //                         // .forEach(element => {
    //                         //     if (element.category === 'Earned') earnedIncomeArray.push(element)
    //                         // }) //cannot read property 'splice' of undefined

    //                         // .filter(function (elem) {
    //                         //     return elem.category === 'Earned'
    //                         // })
    //                         //.splice(selectedIndex, 1)
    //                         .filter(elem => (elem.category === 'Earned'))
    //                         .splice(selectedIndex, 1)
    //                 })
    //             })
    //         //return earnedIncomeArray;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // calculateSum = () => {
    //     try {
    //         await financialStatementService.show()
    //             .then(data => {
    //                 this.setState({
    //                     earnedSum: data.user.userFinances
    //                         .filter(elem => elem.category === 'Earned')
    //                         .reduce((acc, num) => acc + num)
    //                 })
    //             })

    //     } catch (err) {
    //         console.error(err)
    //     }
    // }


    return (
        <>
            <h5>
                {/* let sum = nums.reduce(function(acc, num) {
  console.log('Acc: ', acc)
  console.log('Num: ', num)
  return acc + num;
}, 0); */}

                <span>Earned</span>
                <span className="right">${props.totalEarnedIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    console.log('Acc: ', acc)
                    console.log('Num: ', num)
                    return acc + num;
                }, 0)}
                </span>
            </h5>
            {props.totalEarnedIncome.map(ei => (
                <div key={ei._id}>
                    <Table hover size="sm">
                        {/* <thead>
                                <tr>
                                    <td>Earned Type</td>
                                    <td>Amount</td>
                                    <td></td>
                                </tr>
                            </thead> */}
                        <tbody>
                            <tr>
                                <td>{ei.type}</td>
                                <td>{ei.amount}</td>
                                {/* <td>
                                    <button
                                        name={ei.amount}
                                        value={ei._id}
                                        onClick={this.handleUpdate}>U
                                        </button>
                                    <span>  </span>
                                    <button
                                        //name={ei.amount}
                                        value={ei._id}
                                        onClick={this.handleDelete}>D
                                        </button>
                                </td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}

            <Form ref={props.earnedFormRef} onSubmit={props.handleEarnedIncomeSubmit}>
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newEarnedIncome.type}
                            onChange={props.handleEarnedIncomeChange}
                        >
                            {earnedIncomeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newEarnedIncome.amount}
                            onChange={props.handleEarnedIncomeChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            placeholder="Salary/Commission"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newEarnedIncome.category}
                            onChange={props.handleEarnedIncomeChange} />
                        <Button
                            className="form-submission"
                            onClick={props.handleEarnedIncomeSubmit}
                            disabled={props.earnedFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
