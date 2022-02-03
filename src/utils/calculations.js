/**
 * Calculates what percentage a child entity's sum is of their parent entity's sum
 * @param {number} parent - Parent's total amount
 * @param {number} child - Child's total amount
 * @returns The percentage the child is of its parent
 */
export function calculatePercentage(parent, child) {
	if (!parent || !child) return 0;

	const percentage = (child / parent) * 100;
	if (Number.isInteger(percentage)) return percentage;
	return percentage.toFixed(1);
}

/**
 * Displays an entity's total amount
 * @param {number} amount - The total amount of an entity
 * @returns A number prefixed with $ and has commas for every hundredth place
 */
export function formatAmount(amount) {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
		.format(amount ?? 0)
		.replace(/\.00/g, "");
}

/**
 * Displays an entry's amount
 * @param {number} amount - The amount submitted in the form
 * @returns A number that has commas for every hundredth place without $ or .00
 */
export function formatEntry(amount) {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
		.format(amount ?? 0)
		.replace(/\.00/g, "")
		.replace(/\$/g, "");
}

/**
 * Calculates the total amount of the entity
 * @param {array of objects} entity - { type: string, amount: string, category: string}[]
 * @returns The sum of the entity
 */
export function calculateSum(entity) {
	return entity?.map((elem) => elem.amount).reduce((acc, num) => acc + num, 0);
}

/**
 * Calculates the difference between 2 numbers
 * @param {number} minuend - Number representing the income/assets
 * @param {number} subtrahend - Number representing the expenses/liabilities
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
 * @param {number} number - The total amount of an entity
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
