
import { useState } from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomInput from './UI/CustomInput';
import CustomButton from './UI/CustomButton';
import { getFormattedDate } from '../utils/date.utils';
import { GlobalStyles } from '../styles';

function ExpenseForm({isEditMode, defaultValues, onSubmit, onCancel}){

    const [formValue, setFormValue] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date): '',
            isValid: true
        },
        description: {
            value:defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    inputChangedHandler = (control, value) => {
        setFormValue((currentValue) => {
            return {
                ...currentValue,
                [control]: {value, isValid: true},
            }
        });
    }

    submitFormHandler = () => {
        const expenseData = {
            amount: +formValue.amount.value,
            date: new Date(formValue.date.value),
            description: formValue.description.value
        }
        const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const isDateValid = expenseData.date.toString() !== 'Invalid Date';
        const isDescriptionValid = expenseData.description.trim().length;
        
        const isFormValid = isAmountValid && isDateValid && isDescriptionValid;

        if (isFormValid){
            onSubmit(expenseData);
        } else {
            setFormValue((currentValue) => {
                return {
                    amount: {value: currentValue.amount.value, isValid: isAmountValid},
                    date: {value: currentValue.date.value, isValid: isDateValid},
                    description: {value: currentValue.description.value, isValid: isDescriptionValid}
                }
            })
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }
    }

    const isFormInvalid = !formValue.amount.isValid || !formValue.date.isValid || !formValue.description.isValid;

    return (
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.firstRow}>
          <CustomInput
            label="Amount"
            style={styles.rowInput}
            invalid={!formValue.amount.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "amount"),
              value: formValue.amount.value,
            }}
          />
          <CustomInput
            label="Date"
            style={styles.rowInput}
            invalid={!formValue.date.isValid}
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, "date"),
              value: formValue.date.value,
            }}
          />
        </View>
        <CustomInput
          label="Description"
          invalid={!formValue.description.isValid}
          textInputConfig={{
            multiline: true,
            autoCorrect: false,
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: formValue.description.value,
          }}
        />

        {isFormInvalid && (
          <Text style={styles.errorText}>
            Invalid input - Please check your input values
          </Text>
        )}

        <View style={styles.buttonsContainer}>
          <CustomButton style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </CustomButton>
          <CustomButton style={styles.button} onPress={submitFormHandler}>
            {isEditMode ? "Update" : "Add"}
          </CustomButton>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        marginVertical: 18,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 24,
    },

    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    rowInput: {
        flex: 1,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },

    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },

    errorText: {
        color: GlobalStyles.colors.error500,
        margin: 8,
        textAlign: 'center',
    }


})

export default ExpenseForm;