
import {View, Text, StyleSheet} from 'react-native';

import { GlobalStyles } from '../styles';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';


function ExpensesOutput({expenses, periodName, fallbackText}){

    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (expenses.length){
        content = <ExpensesList expenses={expenses} />;
    }

    return (
        <View style={styles.rootContainer}>
            <ExpensesSummary periodName={periodName} expenses={expenses} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        backgroundColor: GlobalStyles.colors.primary700,
    },

    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }

})

export default ExpensesOutput;