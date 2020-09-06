import React, { useRef } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

import DefaultStyles from '../constants/DefaultStyles';
import Colors from '../constants/colors';

const Console = props => {
    const console = useRef(null);

    return (
        <ScrollView
            style={styles.dataContainer}
            ref={console}
            onContentSizeChange={() => {
                if (props.autoScrolls)
                    console.current.scrollToEnd({ animated: true });
            }}
        >
            <Text style={{ ...DefaultStyles.bodyText, ...styles.text }}>
                {props.data}
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dataContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.accent
    },
    text: {
        fontSize: 18,
        textAlign: 'left',
        paddingBottom: 8,
        paddingLeft: 15,
        borderRightColor: Colors.placeHolder,
        borderRightWidth: 1
    }
});

export default Console;