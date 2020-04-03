The server/admin web app of SalesX project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Configuration

### Back-end

You have to setup 2 environment variables, `SALESX_DB_CONN_STRING` and `SALESX_JWT_KEY` when in production. In development, you only need to define `SALESX_JWT_KEY`.

## API Documentation

- `/users`

    - `GET`
    
        Returns all users.
    - `POST`

        Add a user to the users collection.
- `/users/<id>`

    - `GET`
    
        Returns a specific user having `<id>`.

