import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { getDateMinusDays } from '../utils/date.utils';
import { fetchExpenses } from '../utils/http.utils';
import { ExpensesContext } from './store/context/expenses.context';
import ExpensesOutput from '../components/ExpensesOutput';
import Loader from '../components/UI/Loader';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses(){

    const expensesContext = useContext(ExpensesContext);

    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        async function getExpenses(){
            setIsFetching(true);
            try{
                const expenses = await fetchExpenses();
                expensesContext.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, [])

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7DaysAgo;
    })

    function errorHandler(){
        setError(null);
    }

    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isFetching){
        return <Loader/>
    }

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