const form = document.querySelector<HTMLFormElement>("#expense-form")
const itemName = document.querySelector<HTMLInputElement>("#item-name")
const itemAmount = document.querySelector<HTMLInputElement>("#item-amount")
const itemDate = document.querySelector<HTMLInputElement>("#item-date")
const itemType = document.querySelector<HTMLInputElement>("#item-type")

// Load expenses
let expenses: Expense[] = loadExpenses()
expenses.forEach(printExpense)


type myDate = {
    day: number,
    month: number,
    year: number,
    full: string
}

type Expense = {
    name: string,
    amount: number,
    date: myDate,
    type?: string
}

form?.addEventListener('submit', (e) =>{
    e.preventDefault()
    if (itemAmount == null || itemName == null || itemDate == null) return
    // console.log(typeof +itemAmount.value)

    let newExpense: Expense = {
        name: itemName.value,
        amount: +itemAmount.value,
        date: transformDate(itemDate.value),
        type: ''
    }
    if(itemType != null) newExpense.type = itemType.value

    // itemName.value = ''
    // itemAmount.value = ''
    // itemDate.value = ''
    printExpense(newExpense)
    expenses.push(newExpense)
    saveExpenses()
})

function printExpense(expense: Expense){
    console.log(expense)
    const expenseContainer = document.querySelector<HTMLDivElement>(".expense-container")
    const item = document.createElement('div')
    const itemParent = document.createElement('div')
    const name = document.createElement('p')
    const amount = document.createElement('p')
    const date = document.createElement('p')
    const deleteContainer = document.createElement('div')
    const deleteButton = document.createElement('button')
    // Add classes and ids
    item.setAttribute("class", "item")
    itemParent.setAttribute("class", "itemParent")
    deleteContainer.setAttribute("class", "deleteContainer")
    deleteButton.setAttribute("id", "delete-button")
    name.setAttribute("class", 'expense-labels')
    amount.setAttribute("class", 'expense-labels')
    date.setAttribute("class", 'expense-labels')
    // Add text
    name.append("Name: ", expense.name)
    amount.append("Amout: ", expense.amount.toString())
    date.append("Date: ", expense.date['full'])
    deleteButton.append("Delete")
    
    deleteContainer.append(deleteButton)
    itemParent.append(name, amount, date)
    item.append(itemParent, deleteContainer)
    expenseContainer?.append(item)

    deleteButton.addEventListener('click', e =>{
        item.remove()
        expenses = removeExpense(expense)
        saveExpenses()
    })
}


