import React, { useState } from 'react';
import { Text, Switch, StyleSheet, View, TextInput, Dimensions } from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/colors';

const OptionSwitchCard = props => {
    const [value, setValue] = useState(props.initialState);
    const [inputOpacity, setInputOpacity] = useState(1);

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{props.title}</Text>
            <View style={styles.pair}>
                <TextInput
                    style={{
                        ...props.inputStyle,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.accent,
                        textAlign: 'center',
                        fontFamily: Fonts.fancy,
                        color: Colors.primary,
                        fontSize: 18
                    }}
                    placeholder={props.placeholder}
                    placeholderTextColor={Colors.placeHolder}
                    maxLength={props.maxLength}
                    editable={value}
                    opacity = {inputOpacity}
                    onChangeText = {value =>props.onValueChange(value)}
                />
                <Switch
                    value={value}
                    onValueChange={newValue => {
                        setValue(newValue);
                        setInputOpacity(newValue ? 1 : 0);
                        props.onToggle(newValue);
                    }}
                    trackColor={{ true: Colors.accent }}
                    thumbColor={Colors.primary}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    text: {
        fontFamily: Fonts.fancy,
        fontSize: 20,
        color: Colors.primary
    },
    pair: {
        flexDirection: 'row'
    }
});

export default OptionSwitchCard;