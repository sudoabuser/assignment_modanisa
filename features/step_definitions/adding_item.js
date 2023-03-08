const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const context = require('./hooks');

Given("Empty ToDo list", async () => {
    await context.page.goto("http://todomvc.com/examples/vue/")

    // marking all the items as completed and clicking the button "Clear completed" 
    try {
        await context.page.waitForSelector("body > section > section > label")
        await context.page.click("body > section > section > label")
        await context.page.click("body > section > footer > button")
    } catch (error) {
        console.log("ToDo list is already empty!")
    }
});

When("I write {string} to text box and press {string}", async (string, key) => {
    await context.page.type(".new-todo", string)
    await context.page.keyboard.press(key)
})

Then("I should see {string} item in ToDo list", async (string) => {
    /* I double checked if the item is actually being inserted to the list
    by comparing the '.. item left' string with '1 item left' */
    await context.page.waitForSelector(".todo-count")
    var countContent = await context.page.$(".todo-count")
    let countContentText = await context.page.evaluate(el => el.textContent, countContent)
    assert.strictEqual(countContentText.trimEnd(), "1 item left")
})
