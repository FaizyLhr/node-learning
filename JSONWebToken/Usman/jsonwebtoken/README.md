# JsonWebToken
## Installation
    npm install jsonwebtoken
## How it works?
JWT use a secret key provided by user and use a hashing algorithm. It is used instead of sessions to validate the user state by providing a token to the user. Every time a user want to access something from server he send token with request. The token contain hashed information of that user.

Here is a simple example given in which explained how to create token if user is logged in and how to verify token if user try to access servers. If token is changes or not matched with the provided token than exception throw and we catch it and show errors of accessing with out verified token