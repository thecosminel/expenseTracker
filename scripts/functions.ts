function transformDate(time: string){
    let newTime: String

    let day = time[0] + time [1] + time [2] + time [3]
    let month = time [5] + time[6]
    let year = time [8] + time [9]
    let convertedDate: myDate = {
        day: Number(day),
        month: Number(month),
        year: Number(year),
        full: time
    }
    return convertedDate
}


function loadExpenses(){
    const expenseJSON = localStorage.getItem('EXPENSES')
    if (expenseJSON == null) return []
    return JSON.parse(expenseJSON)
}

function saveExpenses(){
    localStorage.setItem('EXPENSES', JSON.stringify(expenses))
}

function removeExpense(toRemove: Expense){
    let newList = []
    for (var i = 0; i < expenses.length; i++)
        if (expenses[i] != toRemove)
            newList.push(expenses[i])
    return newList
}