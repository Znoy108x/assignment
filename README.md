# Getting Started
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# `.env` example
```
DATABASE_URL=
NEXT_PUBLIC_BACKEND_BASE_URL=
JWT_SECRET_KEY=
```

# What i did?
## 1. User Registration
```tsx
Route: /register
Method: POST
```
Request Body
```tsx
firstName
lastName
email
password
```

`Input Validation`

- Input validation is performed on both the server and client sides using the zod library. 

The following checks are made:

- Ensure all required fields are present.
- sanitizes the values using xss.
- Validate user input (e.g., email format, password, etc.).
- Check if a user with the provided email already exists in the database.

`Registration Process`

- If all required fields are present and user input is valid, check if a user with the provided email already exists in the database.
- If no existing user is found, encrypt the password using bcrypt.
- Store the user information (first name, last name, email, and encrypted password) in the database.

## 2. User Login
```tsx
Route: /login
Method: POST
```

Request Body

```tsx
email
password
```

`Input Validation`
- Input validation is performed on both the server and client sides using the zod library. The following checks are made:
- Ensure all required fields are present.
- sanitises the fields using xss.
- Validate user input (e.g., email format, password strength, etc.).
- Check if a user with the provided email is present in the database.

`Login Process`

- If all required fields are present and user input is valid, check if a user with the provided email exists in the database.
- If a user is found, compare the provided password with the stored encrypted password using bcrypt.compare.
- If the passwords match, authenticate the user and generate a jwt token and store it as `HTTP only` cookie.

## 3. Route Protection
- Route protection is implemented using the middleware.ts file in Next.js.
- Check if the request is related to an API routes.
- Else Validate the JWT token using the jwtVerify function from the jose npm package.
- If the token is not valid and the user wants to access the /login or /register route, allow access.
- If the token is valid and the user wants to access the /login or /register route, deny access and redirect to the / (main) route.
- For other routes, if the token is not valid, redirect to the /login route.
