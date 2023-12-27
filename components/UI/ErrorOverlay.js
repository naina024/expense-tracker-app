
import {View, Text, Button, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../styles';

function ErrorOverlay({message, onConfirm}){
    return (
        <View style={styles.rootContainer}>
            <Text style={[styles.text, styles.title]}>An error Occured</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm} title='Okay'/>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },

    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    message: {

    }


})

export default ErrorOverlay;