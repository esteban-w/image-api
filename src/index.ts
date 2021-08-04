import express  from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// define api routes
app.use('/api', routes);

// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/api/images`);
});

export default app;
