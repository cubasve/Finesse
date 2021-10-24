/**
 * Calculate the percentage of each type of a category
 * @param {*} category - ex. Income, Expense, Asset, Liability
 * @param {*} entity - ex. EarnedIncome, PortfolioIncome, Cash, GoodDebt, etc.
 * @returns A percentage of the type
 */
export function calculatePercentage(category, entity) {
	if (!category || !entity) return 0;

	const percentage = (entity / category) * 100;
	if (Number.isInteger(percentage)) return percentage;
	return percentage.toFixed(1);
}

/**
 * Displays an entity's total amount
 * @param {*} amount - The total amount of an entity
 * @returns A number that is an integer or a floating-point number with 2 decimal places
 */
export function showTotalAmount(amount) {
	if (!amount) return 0;
	if (Number.isInteger(amount)) return amount;
	return amount.toFixed(2);
}

/**
 * Calculate the total amount of the entity
 * @param {*} entity - ex. Income, EarnedIncome, Asset, Cash, GoodDebt, etc.
 * @returns The sum of the entity
 */
export function determineTotalAmount(entity) {
	return entity.map((elem) => elem.amount).reduce((acc, num) => acc + num, 0);
}
