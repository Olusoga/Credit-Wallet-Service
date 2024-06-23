# Lendsqr-be-test

## Development

Libraries used
- Express
- Typescript
- knexjs
- Jest - For testing purpose

### Start development environment

-   Create `.env` file or run `cp sample.env .env`

You can look for the example in the `sample.env`

Next up you can choose to run your development environment entirely inside Docker or to run the app server directly on your local machine.

#### Running Postgres inside Docker

-   Start the development cluster

```bash

docker-compose up 

```


#### Running app server directly on your local machine's environment

- Run `npm i` or `npm install` to install all app dependencies
- Start the app at the root directory using
  - `npm run start:dev` for development
  - `npm run start` for production


## E- R DIAGRAM

+------------+       +-------------+       +-------------+
 |   User     |       |   Account   |       | Transaction |
 +------------+       +-------------+       +-------------+
 | user_id    |<------| account_id  |       | transaction_id|
 | email      |       | user_id     |<------+ sender_id     |
 | password   |       | balance     |       | receiver_id   |
 +------------+       | created_at  |       | amount        |
                      | updated_at  |       | transaction_type |
                      +-------------+       | timestamp     |
                                            +-------------+

## API

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
