import { useEffect, useContext } from 'react';
import {View, StyleSheet} from 'react-native';

import { GlobalStyles } from '../styles';

import { ExpensesContext } from './store/context/expenses.context';

import IconButton from '../components/UI/IconButton';
import CustomButton from '../components/UI/CustomButton';
import { SCREEN } from '../constants';

function AddEditExpense({route, navigation}){

    const expensesContext = useContext(ExpensesContext);

    const expenseId = route.params && route.params.expenseId;
    const isEditMode = !!expenseId;

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

    confirmHandler = () => {
        if (isEditMode){
            expensesContext.updateExpense(expenseId, {
                description: 'test update',
                amount: 50,
                date: new Date()
            });
        } else{
            expensesContext.addExpense({
              description: "test",
              amount: 50,
              date: new Date(),
            });
        }
        navigation.goBack();
    }

    return (
      <View style={styles.rootContainer}>
        <View style={styles.buttonsContainer}>
            <CustomButton style={styles.button} mode='flat' onPress={cancelHandler}>
                Cancel
            </CustomButton>
            <CustomButton style={styles.button} onPress={confirmHandler}>
                {isEditMode ? 'Update' : 'Add'}
            </CustomButton>
        </View>
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

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        minWidth: 120,
        marginHorizontal: 8,
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