const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert');
const ppt = require('./hooks');

Given("ToDo list with {string} item marked", async (string) => {

    // adding an item and making sure the list has just 1 item
    await ppt.page.goto("http://todomvc.com/examples/vue/")
    await ppt.page.type(".new-todo", string)
    await ppt.page.keyboard.press("Enter")
    await ppt.page.waitForSelector(".todo-count")
    var countContent = await ppt.page.$(".todo-count")
    let countContentText = await ppt.page.evaluate(el => el.textContent, countContent)
    assert.strictEqual(countContentText.trimEnd(), "1 item left")

    // marking it as done
    await ppt.page.waitForSelector('body > section > section > ul > li:nth-child(1) > div > input')
    await ppt.page.click('body > section > section > ul > li:nth-child(1) > div > input')

    // checking if it actually is marked by clicking "Completed"
    await ppt.page.click('body > section > footer > ul > li:nth-child(3) > a')

    try {
        let markedItemText = await ppt.page.evaluate(() => {
            return document.querySelector('body > section > section > ul > li > div > label').innerHTML
        })
        assert.strictEqual(markedItemText, string)
    } catch (error) {
        Error("item is not marked as done:", string)
    }
})

When("I click on checkbox next to item", async () => {
    await ppt.page.click('.toggle');
})

Then("I should see {string} item marked as UNDONE", async (string) => {
    // clicking the filtering button "Active"
    await ppt.page.click('body > section > footer > ul > li:nth-child(2) > a')

    // and searching if the item is there
    try {
        let unmarkedItemText = await ppt.page.evaluate(() => {
            return document.querySelector('body > section > section > ul > li > div > label').innerHTML
        })
        assert.strictEqual(unmarkedItemText, string)
    } catch (error) {
        Error("item is marked as done :", string)
    }

})