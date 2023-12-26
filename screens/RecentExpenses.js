import { useContext } from 'react';
import {View, StyleSheet} from 'react-native';

import { GlobalStyles } from '../styles';

import { getDateMinusDays } from '../utils/date.utils';
import { ExpensesContext } from './store/context/expenses.context';
import ExpensesOutput from '../components/ExpensesOutput';

function RecentExpenses(){

    const expensesContext = useContext(ExpensesContext);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7DaysAgo;
    })

    return (
      <View style={styles.rootContainer}>
        <ExpensesOutput
            periodName="Last 7 days"
            expenses={recentExpenses}
            fallbackText="No expenses registered for the last 7 days."
        />
      </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
})

export default RecentExpenses;