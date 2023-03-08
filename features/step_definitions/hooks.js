const puppeteer = require('puppeteer');
const { Before, After } = require('@cucumber/cucumber');
const context = {};

Before(async function () {
    context.browser = await puppeteer.launch({ headless: false });
    context.page = await context.browser.newPage();
});

After(async function () {
    await context.browser.close();
});

module.exports = context;