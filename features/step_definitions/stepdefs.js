const puppeteer = require('puppeteer')
const { Given, When, Then, Before, After } = require('@cucumber/cucumber')
const assert = require('assert');
const { emitKeypressEvents } = require('readline');
const { AssertionError } = require('assert');
const { setDefaultResultOrder } = require('dns');

let browser;
let page;



Before(async function () {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
})

After(async function () {
    await browser.close()
})

Given("Empty ToDo list", async () => {
    await page.goto("http://todomvc.com/examples/vue/")

    // marking all the items as completed and clicking the button "Clear completed" 
    try {
        await page.waitForSelector("body > section > section > label")
        await page.click("body > section > section > label")
        await page.click("body > section > footer > button")
    } catch (error) {
        console.log("ToDo list is already empty!")
    }
});

Given("ToDo list with {string} item", async (string) => {
    await page.goto("http://todomvc.com/examples/vue/")
    await page.type(".new-todo", string)
    await page.keyboard.press("Enter")
    await page.waitForSelector(".todo-count")
    var countContent = await page.$(".todo-count")
    let countContentText = await page.evaluate(el => el.textContent, countContent)
    assert.strictEqual(countContentText.trimEnd(), "1 item left")
})

Given("ToDo list with {string} item marked", async (string) => {
    // adding an item and making sure the list has just 1 item
    await page.goto("http://todomvc.com/examples/vue/")
    await page.type(".new-todo", string)
    await page.keyboard.press("Enter")
    await page.waitForSelector(".todo-count")
    var countContent = await page.$(".todo-count")
    let countContentText = await page.evaluate(el => el.textContent, countContent)
    assert.strictEqual(countContentText.trimEnd(), "1 item left")

    // marking it as done
    await page.waitForSelector('body > section > section > ul > li:nth-child(1) > div > input')
    await page.click('body > section > section > ul > li:nth-child(1) > div > input')

    // checking if it actually is marked by clicking "Completed"
    await page.click('body > section > footer > ul > li:nth-child(3) > a')

    try {
        let markedItemText = await page.evaluate(() => {
            return document.querySelector('body > section > section > ul > li > div > label').innerHTML
        })
        assert.strictEqual(markedItemText, string)
    } catch (error) {
        Error("item is not marked as done:", string)
    }
})

Given("ToDo list with {string} and {string} item in order", async (item1, item2) => {
    await page.goto("http://todomvc.com/examples/vue/")

    // adding the first item
    await page.type(".new-todo", item1)
    await page.keyboard.press("Enter")

    // adding the second item 
    await page.type(".new-todo", item2)
    await page.keyboard.press("Enter")

    // checking if they're in order
    let item1Text = await page.evaluate(() => document.querySelector("body > section > section > ul > li:nth-child(1) > div > label").innerHTML)
    let item2Text = await page.evaluate(() => document.querySelector("body > section > section > ul > li:nth-child(2) > div > label").innerHTML)

    assert.strictEqual(item1Text, item1)
    assert.strictEqual(item2Text, item2)
})

When("I write {string} to text box and press {string}", async (string, key) => {
    await page.type(".new-todo", string)
    await page.keyboard.press(key)
})

When("I click on checkbox next to {string} item", async (item) => {
    // check if the item is there
    try {
        let itemText = await page.evaluate(() => document.querySelector("body > section > section > ul > li > div > label").innerHTML)
        assert.strictEqual(itemText, item)
    } catch (error) {
        Error("item is missing", error)
    }

    // click to the checkbox next to {string} item
    await page.evaluate(() => document.querySelector('body > section > section > ul > li > div > label').previousElementSibling.click()
    )
    let a = await page.evaluate(() => document.querySelector('body > section > section > ul > li > div > label').previousElementSibling.checked
    )
    if (a == true) {
        console.log("checkox is checked")
    } else {
        console.log("checkox is not checked")
    }

})

When("I click on checkbox next to item", async () => {
    await page.click('.toggle');
})

When("I click on delete button next to {string} item", async (string) => {
    // check if the item is on the list
    let itemText = await page.evaluate(() => document.querySelector("body > section > section > ul > li > div > label").innerHTML)
    assert.strictEqual(itemText, string)

    // the pages necessitates hovering to delete the item
    await page.waitForSelector('body > section > section > ul > li > div > label')
    await page.hover('body > section > section > ul > li > div > label')
    await page.click('body > section > section > ul > li > div > button')
})

Then("I should see {string} item in ToDo list", async (string) => {
    /* I double checked if the item is actually being inserted to the list
    by comparing the '.. item left' string with '1 item left' */
    await page.waitForSelector(".todo-count")
    var countContent = await page.$(".todo-count")
    let countContentText = await page.evaluate(el => el.textContent, countContent)
    assert.strictEqual(countContentText.trimEnd(), "1 item left")
})

Then("I should see {string} item inserted to ToDo list below {string} item", async (string, string2) => {
    await page.waitForSelector(".todo-count")

    // here its checking if below items' nth-child index is n+1 as expected  
    let itemAboveText = await page.evaluate(() => {
        return document.querySelector('body > section > section > ul > li:nth-child(1) > div > label').innerHTML
    })

    let itemBelowText = await page.evaluate(() => {
        return document.querySelector('body > section > section > ul > li:nth-child(2) > div > label').innerHTML
    })

    assert.strictEqual(itemAboveText, string2)
    assert.strictEqual(itemBelowText, string)
})

Then("I should see {string} item marked as DONE", async (string) => {
    // clicking the filtering button "Completed"
    await page.click('body > section > footer > ul > li:nth-child(3) > a')

    // and searching if the item is there
    try {
        let markedItemText = await page.evaluate(() => {
            return document.querySelector('.todo .completed').innerHTML
        })
        assert.strictEqual(markedItemText, string)
    } catch (error) {
        Error("item is not marked as done :", string)
    }
})

Then("I should see {string} item marked as UNDONE", async (string) => {
    // clicking the filtering button "Active"
    await page.click('body > section > footer > ul > li:nth-child(2) > a')

    // and searching if the item is there
    try {
        let unmarkedItemText = await page.evaluate(() => {
            return document.querySelector('body > section > section > ul > li > div > label').innerHTML
        })
        assert.strictEqual(unmarkedItemText, string)
    } catch (error) {
        Error("item is marked as done :", string)
    }
})

Then("List should be empty", async () => {
    // checking if there are any child nodes in the todo list
    try {
        hasChild = await page.evaluate(() => document.querySelector('body > section > section > ul').hasChildNodes())
        if (hasChild == false) {
            console.log("list is empty")
        } else {
            console.error("list is not empty")
        }
    } catch (error) {
        console.log("ToDo list is already empty!")
    }
})
