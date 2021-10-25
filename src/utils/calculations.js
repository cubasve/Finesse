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

/**
 * Calculates the difference between 2 numbers
 * @param {*} minuend - Number representing the income/assets
 * @param {*} subtrahend - Number representing the expenses/liabilities
 * @returns A number representing the cash flow or equity
 */
export function calculateDifference(minuend, subtrahend) {
	if (!minuend && !subtrahend) return 0;
	let difference = minuend - subtrahend;
	if (Number.isInteger(difference)) return difference;
	return difference.toFixed(2);
}

/**
 * Determines what color to render depending on amount
 * @param {*} number - The total amount of an entity
 * @returns The color to display
 */
export function determineColor(number) {
	let threshold = 10;
	if (number < threshold && number > 0) {
		return "orange";
	}
	if (number >= threshold) {
		return "green";
	} else {
		return "red";
	}
}
