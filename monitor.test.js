const { checkSite } = require('./monitor');
const axios = require('axios');

jest.mock('axios');

describe('Monitor logic', () => {
    test('Should return online:true when the site is up', async () => {
        axios.get.mockResolvedValue({ status: 200 });
        const result = await checkSite('https://www.test.com');
        expect(result.online).toBe(true);
        expect(result.status).toBe(200);
    });

    test('Shourd return online:false when the site is down', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));
        const result = await checkSite('https://www.test.com');
        expect(result.online).toBe(false);
        expect(result.status).toBe('Down');
    });
}); 