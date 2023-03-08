const { Given } = require('@cucumber/cucumber')
const assert = require('assert');
const context = require('./hooks');

Given("ToDo list with {string} and {string} item in order", async (item1, item2) => {

    await context.page.goto("http://todomvc.com/examples/vue/")

    // adding the first item
    await context.page.type(".new-todo", item1)
    await context.page.keyboard.press("Enter")

    // adding the second item 
    await context.page.type(".new-todo", item2)
    await context.page.keyboard.press("Enter")

    // checking if they're in order
    let item1Text = await context.page.evaluate(() => document.querySelector("body > section > section > ul > li:nth-child(1) > div > label").innerHTML)
    let item2Text = await context.page.evaluate(() => document.querySelector("body > section > section > ul > li:nth-child(2) > div > label").innerHTML)

    assert.strictEqual(item1Text, item1)
    assert.strictEqual(item2Text, item2)
})

