const cron = require('node-cron');
const fs = require('fs');
const { checkSite } = require('./monitor');
const { sendEmailReport } = require('./mailer');
const { timeStamp } = require('console');

const SITES = ['https://www.google.com', 'https://www.facebook.com', 'https://www.twitter.com'];
const DB_PATH = './data.json';

function saveResult(result) {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8') || '[]');
    data.push({ ...result, timeStamp: new Date() });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

cron.schedule('* * * * *', async () => {
    for (const site of SITES) {
        const siteStatus = await checkSite(site);
        saveResult(siteStatus);
    }
});

cron.schedule('0 9 * * *', async () => {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    if (data.length > 0) {
        await sendEmailReport(data);
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }
});
