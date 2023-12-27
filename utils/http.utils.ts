import axios from 'axios';

interface Expense {
    amount: number,
    date: string,
    description: string
}

const BACKEND_URL = 'https://native-expense-tracker-d8984-default-rtdb.firebaseio.com';

export async function fetchExpenses(){
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    const expenses = [];
    for (const key in response.data){
        const {amount, date, description} = response.data[key];
        const expenseObj = {
            id: key,
            amount,
            date: new Date(date),
            description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export async function storeExpense(expenseData: Expense){
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export function updateExpense(expenseId: string, expenseData: Expense){
    return axios.put(BACKEND_URL + `/expenses/${expenseId}.json`, expenseData);
}

export function deleteExpense(expenseId: string){
    return axios.delete(BACKEND_URL + `/expenses/${expenseId}.json`);
}