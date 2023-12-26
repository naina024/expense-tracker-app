
import {View, FlatList, Text, StyleSheet} from 'react-native';

import { GlobalStyles } from '../styles';

import ExpenseItem from './ExpenseItem';

function ExpensesList({expenses}){

    renderExpenseItem = (itemData) => {
        return (
            <ExpenseItem {...itemData.item} />
        )
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={renderExpenseItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {

    }
})

export default ExpensesList;