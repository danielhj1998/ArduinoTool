import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import DefaultStyles from '../constants/DefaultStyles';
import Colors from '../constants/colors';

const MainButton = props => {
    return (
        <TouchableOpacity style ={props.style} activeOpacity = {0.5} onPress = {props.onPress}>
                <Text style={{...DefaultStyles.title, ...styles.title, ...props.textStyle}}>{props.children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: Colors.accent,
        textShadowColor: '#6c948e',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 5
    }
});

export default MainButton;