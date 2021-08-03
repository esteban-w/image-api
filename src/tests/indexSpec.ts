import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test /api/images endpoint responses', () => {
    it('gets the /api/images endpoint', async () => {
            const response = await request.get('/api/images');
            expect(response.status).toBe(200);
        }
    )
});