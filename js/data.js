let income = 0;
let expenses = 0;
let savings = 0;

export function addIncome(amount) {
    income += amount;
}

export function addExpense(amount) {
    expenses += amount;
}

export function addSavings(amount) {
    savings += amount;
}

export function getSummary() {
    return {
        income: income.toFixed(2),
        expenses: expenses.toFixed(2),
        savings: savings.toFixed(2),
    };
}
