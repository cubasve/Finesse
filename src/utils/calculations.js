/*Category: Income, */
/*Entity: EarnedIncome,  PortfolioIncome, PassiveIncome, */

export default function calculatePercentage(category, entity) {
	if (!category || !entity) return 0;

	const percentage = (entity / category) * 100;
	if (Number.isInteger(percentage)) return percentage;
	const result = percentage.toFixed(1);
	return result;
}

// function displayTotalAmount(amount) {
// 	if (!amount) return 0;
// 	if (Number.isInteger(amount)) return amount;
// 	return amount.toFixed(2);
// }

// function determineTotalAmount(entity) {
// 	return entity.map((elem) => elem.amount).reduce((acc, num) => acc + num, 0);
// }
