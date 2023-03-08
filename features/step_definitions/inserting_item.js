const { Given, Then } = require('@cucumber/cucumber')
const assert = require('assert');
const ppt = require('./hooks');

Given("ToDo list with {string} item", async (string) => {
    await ppt.page.goto("http://todomvc.com/examples/vue/")
    await ppt.page.type(".new-todo", string)
    await ppt.page.keyboard.press("Enter")
    await ppt.page.waitForSelector(".todo-count")
    var countContent = await ppt.page.$(".todo-count")
    let countContentText = await ppt.page.evaluate(el => el.textContent, countContent)
    assert.strictEqual(countContentText.trimEnd(), "1 item left")
})

Then("I should see {string} item inserted to ToDo list below {string} item", async (string, string2) => {
    await ppt.page.waitForSelector(".todo-count")

    // here its checking if below items' nth-child index is n+1 as expected  
    let itemAboveText = await ppt.page.evaluate(() => {
        return document.querySelector('body > section > section > ul > li:nth-child(1) > div > label').innerHTML
    })

    let itemBelowText = await ppt.page.evaluate(() => {
        return document.querySelector('body > section > section > ul > li:nth-child(2) > div > label').innerHTML
    })

    assert.strictEqual(itemAboveText, string2)
    assert.strictEqual(itemBelowText, string)

})