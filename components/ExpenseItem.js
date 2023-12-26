
import {View, Text, Pressable, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getFormattedDate } from '../utils/date.utils';
import { GlobalStyles } from '../styles';
import { SCREEN } from '../constants';

function ExpenseItem({id, description, date, amount}){

    const navigation = useNavigation();

    expensePressHandler = () => {
        navigation.navigate(SCREEN.ADD_EDIT_EXPENSE, {
            expenseId: id
        });
    }

    return (
        <Pressable
            onPress={expensePressHandler}
            android_ripple={{color: GlobalStyles.colors.gray500}}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.rootContainer}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    rootContainer: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },

    textBase: {
        color: GlobalStyles.colors.primary50,
    },

    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },

    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },

    pressed: {
        opacity: 0.75,
    }

})

export default ExpenseItem;