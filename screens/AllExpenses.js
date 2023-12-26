import { useContext } from 'react';
import {View, StyleSheet} from 'react-native';

import { GlobalStyles } from '../styles';
import { ExpensesContext } from './store/context/expenses.context';
import ExpensesOutput from '../components/ExpensesOutput';


function AllExpenses(){

    const expensesContext = useContext(ExpensesContext);

    return (
        <View style={styles.rootContainer}>
            <ExpensesOutput
                periodName='All'
                expenses={expensesContext.expenses}
                fallbackText="No registered expenses found."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
})

export default AllExpenses;