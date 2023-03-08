const puppeteer = require('puppeteer');
const { Before, After } = require('@cucumber/cucumber');
const context = {};

Before(async function () {
    context.browser = await puppeteer.launch({ headless: false });
    context.pages = await context.browser.pages()
    context.page = context.pages[0]
});

After(async function () {
    await context.browser.close();
});

module.exports = context;