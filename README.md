# Image-API
This is an image API project that returns images formatted according to query parameters

## Dependencies
- NodeJs >= v.10

## Getting started
1. clone this repo. and cd into root folder, then run: `npm install` to install all dependencies.

2. initialize server by running: `npm run start`.

3. once initialized the endpoint `http://localhost:3000/api/images` could be accessed 

4. a full size image can be requested by specifying ``filename`` query parameter, e.g: 
    ```
    http://localhost:3000/api/images?filename=santamonica.jpg
    ```
   (supported image name characters are `[A-Za-z0-9_]`, and supported image formats are `jpg`, `jpeg`, `png`).

5. resized images can be requested by specifying ``filename``, ``width``, ``height`` query parameters, e.g:
    ```
    http://localhost:3000/api/images?filename=santamonica.jpg&width=300&height=100
    ```
   (`width` and `height` must be numbers).

6. a full size image can also be requested by directly specifying a file as route parameter, e.g: 
    ```
    http://localhost:3000/api/images/santamonica.jpg
    ```
   (supported image name characters are `[A-Za-z0-9_]`, and supported image formats are `jpg`, `jpeg`, `png`).

7. resized images can also be requested by specifying a file as route parameter and ``width``, ``height`` as 
   query parameters, e.g:
   ```
    http://localhost:3000/api/images/santamonica.jpg?width=300&height=100
    ```
   (`width` and `height` must be numbers)

## Scripts available

The following scripts are available to run from the project's root folder:

- `npm run start` to initialize the server
- `npm run prettier` to format the project's code files
- `npm run lint` to find and fix any problems in the project's code files
- `npm run test` to run all test suites
- `npm run build` to build production code