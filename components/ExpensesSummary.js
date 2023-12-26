
import {View, Text, StyleSheet} from 'react-native';

import { GlobalStyles } from '../styles';

function ExpensesSummary({periodName, expenses}){

    const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.periodName}>{periodName}</Text>
            <Text style={styles.expenseSum}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    periodName: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },

    expenseSum: {
        fontSize: 12,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    },
})

export default ExpensesSummary;