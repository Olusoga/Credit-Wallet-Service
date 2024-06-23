# Lendsqr-be-test
Demo Credit Wallet Service is an MVP for a mobile lending app, providing essential wallet functionalities. Users can create accounts, fund their wallets, transfer funds, and withdraw money. The service also ensures that users listed in the Lendsqr Adjutor Karma blacklist are not onboarded, enhancing platform security.


## Features
## Creation:

# Users can create a new account.
1. Checks for duplicate accounts based on email.
2. Ensures users in the Lendsqr Adjutor Karma blacklist are not onboarded.


# Fund Account:
# Users can add funds to their accounts.
1. Secure handling of transactions to maintain data integrity.


# Transfer Funds:
# Users can transfer funds to another user’s account.
1. Validates sender and receiver accounts.
2. Ensures sufficient balance before processing transfers.

# Withdraw Funds:
# Users can withdraw funds from their accounts.
1. Validates account balance before processing withdrawals.

# Technical Stack
Node.js: Server-side JavaScript runtime.
Express.js: Web framework for Node.js.
Knex.js: SQL query builder for database interactions.
PostgreSQL: Relational database to store user and transaction data.
bcrypt: Library for hashing passwords.
axios: HTTP client for making API requests.
TypeScript: Static type checking.

# Installation

git clonehttps://github.com/Olusoga/Credit-Wallet-Service
cd Credit-Wallet-Service

# Install dependencies:
npm intall
# Set up environmental variables
PORT=4040
SALT_ROUNDS=10
DATABASE_URL=your_database_url
JWT_SECRET=secret

# Run database migrations:
npx knex migrate:latest

# Start Server
npm run start:dev

```markdown
## Entity-Relationship Diagram

```plaintext
+------------+       +-------------+       +---------------+
|   User     |       |   Account   |       |  Transaction  |
+------------+       +-------------+       +---------------+
| user_id    |<------| account_id  |       | transaction_id |
| email      |       | user_id     |<------+ sender_id      |
| password   |       | balance     |       | receiver_id    |
+------------+       | created_at  |       | amount         |
                     | updated_at  |       | transaction_type|
                     +-------------+       | timestamp      |
                                           +---------------+


##API

The endpoint to retrieve a state and vehicle Records. 
| Parameter   | Description                               |
| ----------- | ------------------------------------------|
| Base Url    |/                                          |
| HttP method |POST                                       |
|    path     |api/v1/login                               |
|HttP method  |POST                                       |
|    path     |api/v1/signup                              |
|HttP method  |POST                                       |
|   path      |api/v1/register                            |
|Http Method  |POST                                       |
|   Path      |api/v1/transfer                            |                                                     
|Http Method  |POST                                       |                      
|   path      |api/v1/fund                                |                               
|Http Method  |POST                                       |                                    
|   path      |api/v1/withdraw                            |
+---------------------------------------------------------+
These codes are custom to the app and the http status codes are still going to be sent

### Sample Request Parameters
```
  {
    "email":"mulesroland@gmail.com",
    "password":"1234"
}
```
```
{
    "user_id":"15c08156-904b-11ed-bbf6-5c260a5c76ff",
    "balance":"500"
}

```
```
{
    "sender_id":"396455a0-904b-11ed-bbf6-5c260a5c76ff",
    
    "amount":488,
    "transaction_type":"DEPOSIT"

}
```

### Sample Success Response Parameters

```
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzMzNDIxMDksImV4cCI6MTY3MzM0MzMwOX0.ZYoCdwdChHpj_3JLQvD12jAJZc0wLEbhRnlRdBtjcg4"
    },
    "msg": "user created successfully, a mail has been sent to you for Email verification"
}
```
```{
    "data": {
        "user_id": "0f181fa1-90c8-11ed-bd72-5c260a5c76ff",
        "email": "muleroland@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGYxODFmYTEtOTBjOC0xMWVkLWJkNzItNWMyNjBhNWM3NmZmIiwiZW1haWwiOiJtdWxlcm9sYW5kQGdtYWlsLmNvbSIsImlhdCI6MTY3MzM0MzMyOSwiZXhwIjoxNjgxOTgzMzI5fQ.YdbvsKGOo5QFq_aTSxfTjb6BvFjJykNWCR0n2yuAVZ0"
    },
    "msg": "user login successfully"
}
```

```{
   ,
    "msg": "Account created successfully, a mail has been sent to you for Email verification"
}
```
```
{
    
    "msg": "Transaction successful"

}


# Todo

I had a lot of fun building this but there are some improvements I can still make:

- Add migrations for database purpose
- Add more test cases
- add open Api for proper documentation
- Have a standard response helper

# Testing

- To run the tests, simply type `npm test`
- We can also get code coverage by `npm run coverage`

Thank you 👍
