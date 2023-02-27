Feature: ToDo list
    This is a simple to do list

    Scenario: Adding an item
        Given Empty ToDo list
        When I write "buy some milk" to text box and press "Enter"
        Then I should see "buy some milk" item in ToDo list

    Scenario: Inserting an item
        Given ToDo list with "buy some milk" item
        When I write "enjoy the assignment" to text box and press "Enter"
        Then I should see "enjoy the assignment" item inserted to ToDo list below "buy some milk" item
    @demo
    Scenario: Marking as done
        Given ToDo list with "buy some milk" item
        When I click on checkbox next to "buy some milk" item
        Then I should see "buy some milk" item marked as DONE
    @demo
    Scenario: Marking as undone
        Given ToDo list with "buy some milk" item marked
        When I click on checkbox next to item
        Then I should see "buy some milk" item marked as UNDONE

    Scenario: Deleting item
        Given ToDo list with "rest for a while" item
        When I click on delete button next to "rest for a while" item
        Then List should be empty

    Scenario: Removing one item
        Given ToDo list with "rest for a while" and "drink water" item in order
        When I click on delete button next to "rest for a while" item
        Then I should see "drink water" item in ToDo list