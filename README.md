# Finesse

## Description:

Finesse is based on the book "Increase Your Financial IQ" by Robert Kiyosaki. It implements the diagrams in the book and has additional features added onto them.

Finesse aims to simplify financial jargon so it is easy to understand and it aims to teach financial literacy using financial statements.

### Background Info:
Financial literacy (the language of money) is now being implemented in Ontario schools as well as coding.
It is one of the many skills that are needed in the future.
However, there are many adults, including highly-educated ones, that are financially illiterate. 


The application Finesse strives to remove all the extra, complex words so everyone can understand the key concepts.
Finesse
- Includes the idea of "paying yourself first" to ensure that the user prioritizes their financial future
- Introduces different types of income, assets, and liabilities
- Introduces easy definitions so everyone can understand
- Shows the connection between the 3 financial statements: income statement, balance sheet and cash flow statement


## Screenshots of Application:
![image](https://user-images.githubusercontent.com/62129720/89247757-09134280-d5dc-11ea-919a-2b1e8de72565.png)

![image](https://user-images.githubusercontent.com/62129720/89247855-3bbd3b00-d5dc-11ea-940d-d4fcc96c9aec.png)

## Technologies Used:
- MongoDB/Mongoose
- Express
- React
- Node

## Getting Started:
- Application: https://drippininfinesse.herokuapp.com/
- Trello Board: https://trello.com/b/f7luley2/finesse

## Next Steps: Planned Future Enhancements
- **Add functionality to Pay Yourself First:**
The user can input an integer, which represents a percentage, and that gets deducted from the user's paycheque/income source before they pay for their other expenses.

- **Add definitions to terms:**
When the information icon button is clicked, the popup will show the definition for the particular term.

- **Math calculations for each financial statement:**
    - Income Statement: Cash Flow = Total Income - Total Expenses 
    - Balance Sheet: Assets = Liabilities + Equity 

- **Add percentages to data inputs:**
For instance, out of all the income the user has, how much is allocated to earned, portfolio and passive out of 100%?

- **Add validation for the income statement:**
    - If the income exceeds the expenses, then there will be a green border surrounding the income statement.
    - If the income is equal to the expenses (breaking even), then there will be an orange border around the income statement.
    - If the income is less than the expenses, then there will be a red border.

- **Add arrows to the UI:**
The arrows represent the cash flow statement, which is what connects the balance sheet and the income statement.
    - Earned income is linked to a job (employer's financial statement)
    - Portfolio income comes from paper assets
    - Passive income comes from the other asset classes (business, real estate, commodities)
    - Good debt is connected to assets
    - Bad debt is connected to expenses

- **Tabs for month & year:**
The user should be able to track their finances monthly, quarterly and annually and see the changes between them. 
