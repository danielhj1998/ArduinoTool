import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { useHeaderHeight } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial';

import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/DefaultStyles';
import Values from '../constants/Values';
import Colors from '../constants/colors';
import BarCard from '../components/BarCard';
import TerminalOptions from '../components/TerminalOptions';
import Console from '../components/Console';
import { sendData, clearTerminal } from '../store/actions/bluetooth';

const TerminalScreen = props => {
    const [typedText, setTypedText] = useState('');
    const [autoScroll, setAutoScroll] = useState(true);
    const [logs, connected] = useSelector(state => [state.terminalData, state.connected]);

    const dispatch = useDispatch();

    const keyboardOffset = -useHeaderHeight() * 2 - Values.barCardHeight;

    const sendDataHandler = text => {
        if (text.length > 0 && connected) {
            BluetoothSerial.write(text)
                .then((sent) => {
                    if (sent) {
                        dispatch(sendData('>' + text + '\n'));
                        setTypedText('');
                    }
                    else {
                        ToastAndroid.show('Error trying to send data', ToastAndroid.SHORT);
                    }
                });
        }
    };

    return (

        <View style={styles.screen}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardOffset}
                style={styles.keyboardView}
                behavior="padding"
            >
                <BarCard>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[DefaultStyles.bodyText, styles.text]}
                            placeholder='Send bytes through the serial'
                            placeholderTextColor={Colors.placeHolder}
                            onChangeText={text => setTypedText(text)}
                            value={typedText}
                            numberOfLines={1}
                        />
                    </View>
                    <MainButton
                        style={styles.iconButtons}
                        textStyle={styles.textButton}
                        onPress={() => sendDataHandler(typedText)}
                    >
                        <Ionicons name="md-send" size={42} />
                    </MainButton>
                </BarCard>
                <Console data={logs} autoScrolls={autoScroll} />
            </KeyboardAvoidingView>
            <TerminalOptions
                onClear={() => dispatch(clearTerminal())}
                autoScroll={autoScroll}
                onAutoScroll={() => setAutoScroll(!autoScroll)}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.secondary
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.accent
    },
    text: {
        fontSize: 18,
        textAlign: 'left',
        padding: 7
    },
    keyboardView: {
        flex: 1,
        width: '100%'
    }
});

export default TerminalScreen;