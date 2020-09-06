import {StyleSheet} from 'react-native';
import Colors from './colors';
import Fonts from './Fonts';

const styles = StyleSheet.create({
    bodyText: {
        fontFamily: Fonts.fancy,
        fontSize: 21,
        color: Colors.primary
    },
    title: {
        fontFamily: Fonts.fancy,
        fontSize: 30,
        textAlign: 'center',
        color: Colors.primary
    }
});

export default styles;