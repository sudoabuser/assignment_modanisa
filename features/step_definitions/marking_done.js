const { When, Then } = require('@cucumber/cucumber')
const assert = require('assert');
const ppt = require('./hooks');

When("I click on checkbox next to {string} item", async (item) => {
    // check if the item is there
    try {
        let itemText = await ppt.page.evaluate(() => document.querySelector("body > section > section > ul > li > div > label").innerHTML)
        assert.strictEqual(itemText, item)
    } catch (error) {
        Error("item is missing", error)
    }

    // click to the checkbox next to {string} item
    await ppt.page.evaluate(() => document.querySelector('body > section > section > ul > li > div > label').previousElementSibling.click()
    )
    let a = await ppt.page.evaluate(() => document.querySelector('body > section > section > ul > li > div > label').previousElementSibling.checked
    )
    if (a == true) {
        console.log("checkbox is checked")
    } else {
        console.log("checkbox is not checked")
    }

})

Then("I should see {string} item marked as DONE", async (string) => {
    // clicking the filtering button "Completed"
    await ppt.page.click('body > section > footer > ul > li:nth-child(3) > a')

    // and searching if the item is there
    try {
        let markedItemText = await ppt.page.evaluate(() => {
            return document.querySelector('.todo .completed').innerHTML
        })
        assert.strictEqual(markedItemText, string)
    } catch (error) {
        Error("item is not marked as done :", string)
    }

})