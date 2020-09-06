import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import DefaultStyles from '../constants/DefaultStyles';
import Colors from '../constants/colors';

const TabButton = props => {
    let textStyle = styles.disabledTitle;
    let containerStyle = styles.disabledContainer;

    if(props.active){
        textStyle = styles.activeTitle;
        containerStyle = styles.activeContainer;
    }

    return (
        <TouchableOpacity style ={props.style} activeOpacity = {0.5} onPress = {props.onPress}>
                <View style = {containerStyle}>
                    <Text style={[DefaultStyles.title, textStyle]}>
                        {props.children}
                    </Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    activeContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:5,
        backgroundColor: Colors.secondary,
    },
    activeTitle: {
        textAlign: 'center',
        fontSize: 26,
        color: Colors.primary
    },
    disabledContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:5,
        backgroundColor: Colors.primary,
        elevation: 5
        
    },
    disabledTitle:{
        textAlign: 'center',
        fontSize: 26,
        color: Colors.accent 
    }
});

export default TabButton;