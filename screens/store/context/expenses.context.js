import { createContext, useState, useReducer } from "react";
import { ACTIONS } from "../../../constants";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Shoes',
        amount: 1500,
        date: new Date('2023-12-19')
    },
    {
        id: 'e2',
        description: 'Books',
        amount: 3000,
        date: new Date('2023-12-24')
    },
    {
        id: 'e3',
        description: 'Shopping',
        amount: 2590,
        date: new Date('2023-10-15')
    },
    {
        id: 'e4',
        description: 'Medical',
        amount: 5320,
        date: new Date('2023-12-09')
    },
    {
        id: 'e5',
        description: 'Shoes',
        amount: 1500,
        date: new Date('2023-12-19')
    },
    {
        id: 'e6',
        description: 'Books',
        amount: 3000,
        date: new Date('2023-12-24')
    },
    {
        id: 'e7',
        description: 'Shopping',
        amount: 2590,
        date: new Date('2023-10-15')
    },
    {
        id: 'e8',
        description: 'Medical',
        amount: 5320,
        date: new Date('2023-12-09')
    },
    {
        id: 'e9',
        description: 'Shoes',
        amount: 1500,
        date: new Date('2023-12-19')
    },
    {
        id: 'e10',
        description: 'Books',
        amount: 3000,
        date: new Date('2023-12-24')
    },
    {
        id: 'e11',
        description: 'Shopping',
        amount: 2590,
        date: new Date('2023-10-15')
    },
    {
        id: 'e12',
        description: 'Medical',
        amount: 5320,
        date: new Date('2023-12-09')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    updateExpense: (id, {description, amount, date}) => {},
    deleteExpense: (id) => {},
})

function expensesReducer(state, action) {
    switch(action.type){
        case ACTIONS.ADD:
            const id = new Date().toString() + Math.random.toString();
            return [{...action.payload, id}, ...state];

        case ACTIONS.UPDATE:
            const updatableExpenseIndex = state.findIndex((expense) => {
                return expense.id === action.payload.id;
            })

            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense , ...action.payload.data};
            const updatedExpenses = [...state];

            updatedExpenses[updatableExpenseIndex] = updatedItem;

            return updatedExpenses;

        case ACTIONS.DELETE:
            return state.filter((expense) => expense.id !== action.payload);

        default:
            return state;
    }
}


function ExpensesContextProvider({children}) {

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    addExpense = (expenseData) => {
        dispatch({type: ACTIONS.ADD, payload: expenseData});
    }

    updateExpense = (id, expenseData) => {
        dispatch({type: ACTIONS.UPDATE, payload: {id, data: expenseData}});
    }

    deleteExpense = (id) => {
        dispatch({type: ACTIONS.DELETE, payload: id});
    }

    const value = {
        expenses: expensesState,
        addExpense,
        updateExpense,
        deleteExpense
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )

}


export default ExpensesContextProvider;