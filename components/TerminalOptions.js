import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Checkbox} from 'react-native-paper';

import DefaultStyles from '../constants/DefaultStyles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import BottomBar from './BottomBar';

const TerminalOptions = props => {
    return (
        <BottomBar>
            <MainButton
                style={{ paddingHorizontal: 20 }}
                onPress={props.onClear}
            >
                <MaterialCommunityIcons name="broom" size={42} />
            </MainButton>
            <View style={styles.checkboxContainer}>
                <Text style={DefaultStyles.bodyText}>Auto Scroll</Text>
                <Checkbox
                    status={props.autoScroll ? 'checked' : 'unchecked'}
                    onPress={props.onAutoScroll}
                    color={Colors.accent}
                    uncheckedColor = {Colors.accent}
                />
            </View>
        </BottomBar>
    );
}

const styles = StyleSheet.create({
    checkboxContainer:{
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export default TerminalOptions;