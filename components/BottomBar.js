import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const BottomBar = props =>{
    return(
        <View style = {styles.bar}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        height: Dimensions.get('window').height*0.08,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default BottomBar;