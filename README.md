# My Express Server

This is a scaffold for an Express server with TypeScript.

## Project Structure

The project has the following files:

- `src/app.ts`: This file is the entry point of the application. It creates an instance of the express app and sets up middleware and routes.
- `src/controllers/index.ts`: This file exports a class `IndexController` which has a method `getIndex` that handles the root route of the application.
- `src/routes/index.ts`: This file exports a function `setRoutes` which sets up the routes for the application. It uses the `IndexController` to handle the root route.
- `src/types/index.ts`: This file exports interfaces `Request` and `Response` which extend the interfaces from the `express` library.
- `tsconfig.json`: This file is the configuration file for TypeScript. It specifies the compiler options and the files to include in the compilation.
- `package.json`: This file is the configuration file for npm. It lists the dependencies and scripts for the project.
- `README.md`: This file contains the documentation for the project.

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Build the project with `npm run build`.
4. Start the server with `npm start`.

## Available Scripts

- `build`: Compiles the TypeScript code to JavaScript.
- `start`: Starts the server.
- `dev`: Starts the server in development mode with nodemon.

## License

This project is licensed under the MIT License - see the LICENSE file for details.