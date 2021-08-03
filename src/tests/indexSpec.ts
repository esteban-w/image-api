import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test /api/images endpoint responses', () => {
    it('gets the /api/images endpoint', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
    });

    it('returns not found status when providing non-existing file as filename query param', async () => {
        const response = await request.get('/api/images?filename=dummyImage.jpg');
        expect(response.status).toBe(404);
    });

    it('returns found file when providing existing JPG as filename query param', async () => {
        const response = await request.get('/api/images?filename=santamonica.jpg');
        expect(response.status).toBe(200);
    });

    it('returns found file when providing existing PNG as filename query param', async () => {
        const response = await request.get('/api/images?filename=sunset.png');
        expect(response.status).toBe(200);
    });

    it('returns found file when providing existing JPEG as filename query param', async () => {
        const response = await request.get('/api/images?filename=space.jpeg');
        expect(response.status).toBe(200);
    });

    it('returns resized JPG when specifying filename, width and height as query params', async () => {
        const response = await request.get('/api/images?filename=santamonica.jpg&width=300&height=100');
        expect(response.status).toBe(200);
    });

    it('returns resized PNG when specifying filename, width and height as query params', async () => {
        const response = await request.get('/api/images?filename=sunset.png&width=300&height=100');
        expect(response.status).toBe(200);
    });

    it('returns resized JPEG when specifying filename, width and height as query params', async () => {
        const response = await request.get('/api/images?filename=space.jpeg&width=300&height=100');
        expect(response.status).toBe(200);
    });

    it('returns not found status when providing non-existing file as route param', async () => {
        const response = await request.get('/api/images/dummyImage.jpg');
        expect(response.status).toBe(404);
    });

    it('returns found file when providing existing JPG as route param', async () => {
        const response = await request.get('/api/images/santamonica.jpg');
        expect(response.status).toBe(200);
    });

    it('returns found file when providing existing PNG as route param', async () => {
        const response = await request.get('/api/images/sunset.png');
        expect(response.status).toBe(200);
    });

    it('returns found file when providing existing JPEG as route param', async () => {
        const response = await request.get('/api/images/space.jpeg');
        expect(response.status).toBe(200);
    });

    it('returns resized JPG when specifying filename, width and height as route params', async () => {
        const response = await request.get('/api/images/santamonica.jpg?width=300&height=100');
        expect(response.status).toBe(200);
    });

    it('returns resized PNG when specifying filename, width and height as route params', async () => {
        const response = await request.get('/api/images/sunset.png?width=300&height=100');
        expect(response.status).toBe(200);
    });

    it('returns resized JPEG when specifying filename, width and height as route params', async () => {
        const response = await request.get('/api/images/space.jpeg?width=300&height=100');
        expect(response.status).toBe(200);
    });
});