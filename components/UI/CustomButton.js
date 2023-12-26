
import {View, StyleSheet, Pressable, Text} from 'react-native';

import { GlobalStyles } from '../../styles';

function CustomButton({children, mode, onPress, style}){
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                style={({pressed}) => pressed && styles.pressed}
            >
                <View style={[styles.rootContainer, mode==='flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode==='flat' && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },

    flat: {
        backgroundColor: 'transparent',
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
    },

    flatText: {
        color: GlobalStyles.colors.primary200
    },

    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    }

})

export default CustomButton;