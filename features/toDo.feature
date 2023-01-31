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


# When coping with larger data groups we could use scenario outline.
# Since in this project we don't have any duplicate scenarios, I believe there's no need.
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Scenario Outline: Adding item to toDo list

#     Given Empty ToDo list
#     When I write "<toDo>" to "<selector>" and press "<key>"
#     Then I should see "<toDo>" item in ToDo list

#     Examples:
#         | toDo          | selector  | key   |
#         | buy some milk | .new-todo | Enter |
