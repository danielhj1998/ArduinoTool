import React from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native';

import Colors from '../constants/colors';
import DefaultSytles from '../constants/DefaultStyles';

const BluetoothList = props => {
    const renderBluetoothItem = device => {
        let selectedColor = Colors.secondary;
        if (props.selectedId === device.id)
            selectedColor = Colors.placeHolder;
        
        return (
            <TouchableOpacity 
                style = {{...styles.listItem, backgroundColor: selectedColor}} activeOpacity = {0.75} 
                onPress = {() =>props.onSelect(device.id)}
            >
                <Text style={[DefaultSytles.bodyText, styles.text]} numberOfLines = {1}>
                    {device.name !== null ? device.name : device.id}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.listContainer}>
            <FlatList
                style={{ width: '100%' }}
                data={props.data}
                renderItem={({item}) => renderBluetoothItem(item)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        flex: 1,
        paddingVertical: 20,
    },
    listItem: {
        borderColor: Colors.placeHolder,
        borderWidth: 2,
        padding: 10,
        margin: 10
    },
    text: {
        textAlign: 'center'
    }
});

export default BluetoothList;