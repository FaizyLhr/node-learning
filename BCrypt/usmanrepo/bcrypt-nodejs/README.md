# bcrypt with Node.js
bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher and presented at USENIX in 1999.
## Installation
        npm install bcrypt
## Use
* var hashed = bcrypt.hashSync('yourPassword', saltRounds) 
* var result = bcrypt.compareSync('yourPassword', hashed)
## How it works?
Generating random bytes (the salt) and combining it with the password before hashing creates unique hashes across each user’s password. If two users have the same password they will not have the same password hash. This is to prevent rainbow table attacks which can reverse hashed passwords using common hashing functions that do not utilize a salt.

Uses Hashing algorithms that are one way functions. They turn any amount of data into a fixed-length “fingerprint” that cannot be reversed. They also have the property that if the input changes by even a tiny bit, the resulting hash is completely different (see the example above). This is great for protecting passwords, because we want to store passwords in a form that protects them even if the password file itself is compromised, but at the same time, we need to be able to verify that a user’s password is correct.

## Work Flow
- get user password sign up
- hash it using hashSync function and save into db 
- again user enter password for login
- compare it with hashed password saved in db using compareSync function
