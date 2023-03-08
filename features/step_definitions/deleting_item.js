const { When, Then } = require('@cucumber/cucumber')
const assert = require('assert');
const context = require('./hooks');

When("I click on delete button next to {string} item", async (string) => {
    // check if the item is on the list
    let itemText = await context.page.evaluate(() => document.querySelector("body > section > section > ul > li > div > label").innerHTML)
    assert.strictEqual(itemText, string)

    // the pages necessitates hovering to delete the item
    await context.page.waitForSelector('body > section > section > ul > li > div > label')
    await context.page.hover('body > section > section > ul > li > div > label')
    await context.page.click('body > section > section > ul > li > div > button')
})

Then("List should be empty", async () => {
    // checking if there are any child nodes in the todo list
    try {
        hasChild = await context.page.evaluate(() => document.querySelector('body > section > section > ul').hasChildNodes())
        if (hasChild == false) {
            console.log("list is empty")
        } else {
            console.error("list is not empty")
        }
    } catch (error) {
        console.log("ToDo list is already empty!")
    }

})