import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';

import Values from '../constants/Values';
import Colors from '../constants/colors';

const BarCard = props => {
    return (
        <View style ={{...props.style,...styles.cardStyle}} >
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    cardStyle: {
        alignItems: 'center',
        width: '100%',
        height: Values.barCardHeight,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 5,
        backgroundColor: Colors.secondary,
        elevation: 5
    }
});

export default BarCard;