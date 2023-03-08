const puppeteer = require('puppeteer');
const { Before, After } = require('@cucumber/cucumber');
const ppt = {};

Before(async function () {
    ppt.browser = await puppeteer.launch({ headless: false });
    ppt.pages = await ppt.browser.pages()
    ppt.page = ppt.pages[0]
});

After(async function () {
    await ppt.browser.close();
});

module.exports = ppt;