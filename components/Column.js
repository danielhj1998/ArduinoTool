import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/colors';
import DefaultStyles from '../constants/DefaultStyles';
import MainButton from './MainButton';

const Column = props => {
    return (
        <View style={styles.column}>
            <Text style={{ ...DefaultStyles.bodyText}} numberOfLines={1}>{props.title}</Text>
            <MainButton onPress = {()=>props.onClose(props.title)}><Ionicons name="ios-close" size={40} /></MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    column: {
        flexDirection: 'row',
        height: Dimensions.get('window').height*0.08,
        flex:1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: Colors.placeHolder,
        borderRightWidth: 1,
        paddingHorizontal: 10
    },
});

export default Column;