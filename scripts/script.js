"use strict";
const form = document.querySelector("#expense-form");
const itemName = document.querySelector("#item-name");
const itemAmount = document.querySelector("#item-amount");
const itemDate = document.querySelector("#item-date");
const itemType = document.querySelector("#item-type");
// Load expenses
let expenses = loadExpenses();
expenses.forEach(printExpense);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (itemAmount == null || itemName == null || itemDate == null)
        return;
    // console.log(typeof +itemAmount.value)
    let newExpense = {
        name: itemName.value,
        amount: +itemAmount.value,
        date: transformDate(itemDate.value),
        type: ''
    };
    if (itemType != null)
        newExpense.type = itemType.value;
    // itemName.value = ''
    // itemAmount.value = ''
    // itemDate.value = ''
    printExpense(newExpense);
    expenses.push(newExpense);
    saveExpenses();
});
function printExpense(expense) {
    console.log(expense);
    const expenseContainer = document.querySelector(".expense-container");
    const item = document.createElement('div');
    const itemParent = document.createElement('div');
    const name = document.createElement('p');
    const amount = document.createElement('p');
    const date = document.createElement('p');
    const deleteContainer = document.createElement('div');
    const deleteButton = document.createElement('button');
    // Add classes and ids
    item.setAttribute("class", "item");
    itemParent.setAttribute("class", "itemParent");
    deleteContainer.setAttribute("class", "deleteContainer");
    deleteButton.setAttribute("id", "delete-button");
    name.setAttribute("class", 'expense-labels');
    amount.setAttribute("class", 'expense-labels');
    date.setAttribute("class", 'expense-labels');
    // Add text
    name.append("Name: ", expense.name);
    amount.append("Amout: ", expense.amount.toString());
    date.append("Date: ", expense.date['full']);
    deleteButton.append("Delete");
    deleteContainer.append(deleteButton);
    itemParent.append(name, amount, date);
    item.append(itemParent, deleteContainer);
    expenseContainer === null || expenseContainer === void 0 ? void 0 : expenseContainer.append(item);
    deleteButton.addEventListener('click', e => {
        item.remove();
        expenses = removeExpense(expense);
        saveExpenses();
    });
}
