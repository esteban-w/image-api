# Image-API
This is an image API project that returns images formatted according to query parameters

## Dependencies
- NodeJs >= v.10

## Getting started
1. clone this repo. and cd into root folder, then run: `npm install` to install all dependencies.

2. initialize server by running: `npm run start`.

3. a full size image can be requested by specifying ``filename`` query parameter, e.g: 
    ```
    http://localhost:300/api/images?filename=santamonica.jpg
    ```
   (supported image name characters are `[A-Za-z0-9_]`, and supported image formats are `jpg`, `jpeg`, `png`).

4. resized images can be requested by specifying ``filename``, ``width``, ``height`` query parameters, e.g:
    ```
    http://localhost:300/api/images?filename=santamonica.jpg&width=300&height=100
    ```
   (`width` and `height` must be numbers).

5. a full size image can also be requested by directly specifying a file as route parameter, e.g: 
    ```
    http://localhost:300/api/images/santamonica.jpg
    ```
   (supported image name characters are `[A-Za-z0-9_]`, and supported image formats are `jpg`, `jpeg`, `png`).

6. resized images can also be requested by specifying a file as route parameter and ``width``, ``height`` as 
   query parameters, e.g:
   ```
    http://localhost:300/api/images/santamonica.jpg?width=300&height=100
    ```
   (`width` and `height` must be numbers)