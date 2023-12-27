import { createContext, useState, useReducer } from "react";
import { ACTIONS } from "../../../constants";

// const DUMMY_EXPENSES = [
//     {
//         id: 'e1',
//         description: 'Books',
//         amount: 1500,
//         date: new Date('2023-12-19')
//     },
// ]

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => {},
    addExpense: ({description, amount, date}) => {},
    updateExpense: (id, {description, amount, date}) => {},
    deleteExpense: (id) => {},
})

function expensesReducer(state, action) {
    switch(action.type){
        case ACTIONS.SET:
            return action.payload.reverse();

        case ACTIONS.ADD:
            return [action.payload, ...state];

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

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    setExpenses = (expenses) => {
        dispatch({type: ACTIONS.SET, payload: expenses})
    }

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
        setExpenses,
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