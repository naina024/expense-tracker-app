import { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { GlobalStyles } from '../styles';

import { ExpensesContext } from './store/context/expenses.context';

import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ExpenseForm';

function AddEditExpense({route, navigation}){

    const expensesContext = useContext(ExpensesContext);

    const expenseId = route.params && route.params.expenseId;
    const isEditMode = !!expenseId;

    const selectedExpense = expensesContext.expenses.find(
        expense => expense.id === expenseId
        )

    useEffect(() => {
        navigation.setOptions({
            title: isEditMode ? 'Edit Expense' : 'Add Expense'
        }, [navigation, isEditMode])
    })

    deleteExpenseHandler = () => {
        expensesContext.deleteExpense(expenseId);
        navigation.goBack();
    }

    cancelHandler = () => {
        navigation.goBack();
    }

    confirmHandler = (expenseData) => {
        if (isEditMode){
            expensesContext.updateExpense(expenseId, expenseData);
        } else{
            expensesContext.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
      <View style={styles.rootContainer}>
        <ExpenseForm
          isEditMode={isEditMode}
          defaultValues={selectedExpense}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
        />
        {isEditMode && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              size={36}
              color={GlobalStyles.colors.error500}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
})

export default AddEditExpense;