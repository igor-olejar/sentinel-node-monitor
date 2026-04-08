const axios = require('axios');

async function checkSite(url) {
    const start = Date.now();

    try {
        const response = await axios.get(url);
        const duration = Date.now() - start;
        return {
            url,
            status: response.status,
            latency: duration + 'ms',
            online: true,
        };
    } catch (error) {
        return {
            url,
            status: error.response ? error.response.status : 'Down',
            latency: null,
            online: false,
        };
    }
};