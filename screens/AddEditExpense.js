import { useEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { GlobalStyles } from '../styles';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http.utils';

import { ExpensesContext } from './store/context/expenses.context';

import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ExpenseForm';
import Loader from '../components/UI/Loader';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function AddEditExpense({route, navigation}){

    const expensesContext = useContext(ExpensesContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

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

    async function deleteExpenseHandler(){
        setIsSubmitting(true);
        try{
          await deleteExpense(expenseId);
          expensesContext.deleteExpense(expenseId);
          navigation.goBack();
        } catch {
          setError('Could not delete the expense');
        }
        setIsSubmitting(false);
    }

    cancelHandler = () => {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try{
          if (isEditMode){
            await updateExpense(expenseId, expenseData);
            expensesContext.updateExpense(expenseId, expenseData);
          } else{
            const id = await storeExpense(expenseData);
            expensesContext.addExpense({...expenseData, id});
          }
          navigation.goBack();
        } catch {
          setError('Could not save data - please try again later!');
          setIsSubmitting(false);
        }
    }

    if (error && !isSubmitting){
      return <ErrorOverlay message={error} onConfirm={cancelHandler} />
    }

    if(isSubmitting){
      return <Loader/>
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