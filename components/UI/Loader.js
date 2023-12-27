
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../styles';

function Loader(){
    return (
        <View style={styles.rootContainer}>
            <ActivityIndicator size='large' color='white'/>
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
    }
})

export default Loader;