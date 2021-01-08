# Finesse

## Description:

Finesse is based on the book "Increase Your Financial IQ" by Robert Kiyosaki. It implements the diagrams in the book and has additional features added onto them.

Finesse aims to:
1. Teach financial literacy using financial statements 
2. Simplify financial jargon so it is easy for everyone to understand

### Background Info:
There is a lot of importance placed on literacy in reading and math, and unfortunately other types of literacy have been overlooked or ignored. This changed when Ontario schools made the decision to implement courses teaching financial literacy (the language of money) and coding into their curriculum.
It is one of the many skills that are needed in the future.
However, there are many individuals, including highly-educated adults, that are financially illiterate. 

Finesse
- Includes the idea of "paying yourself first" to ensure that the user prioritizes their financial future
- Introduces different types of income, assets, and liabilities
- Includes easy definitions so everyone can understand
- Shows the connection between the 3 financial statements: income statement, balance sheet and cash flow statement


## Screenshots of Application:
![image](https://user-images.githubusercontent.com/62129720/97793140-4fb61000-1bbe-11eb-8a75-8a12acf83cf3.png)

![image](https://user-images.githubusercontent.com/62129720/97793149-6bb9b180-1bbe-11eb-8284-04b08858d197.png)

![image](https://user-images.githubusercontent.com/62129720/97793157-84c26280-1bbe-11eb-9301-308bf64922df.png)

![image](https://user-images.githubusercontent.com/62129720/97793162-96a40580-1bbe-11eb-8ed2-74ed7fe71d18.png)

![image](https://user-images.githubusercontent.com/62129720/103989461-bb3bd100-515d-11eb-8de3-67d4f404c05a.png)

![image](https://user-images.githubusercontent.com/62129720/103989637-fe963f80-515d-11eb-9e12-df988e19c6b6.png)

## Technologies Used:
- MongoDB/Mongoose
- Express
- React
- Node

## Dependencies:
- bcrypt
- dotenv
- express
- json web token
- mongoose
- react-bootstrap
- react-router-dom

## Getting Started:
- Application: https://drippininfinesse.herokuapp.com/
- Trello Board: https://trello.com/b/f7luley2/finesse

## Next Steps: Planned Future Enhancements
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
