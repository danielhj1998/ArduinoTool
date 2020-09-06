import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import TerminalScreen from '../screens/TerminalScreen';
import TabularScreen from '../screens/TabularScreen';
import GraphicScreen from '../screens/GraphicSreen';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';
import Fonts from '../constants/Fonts';

const ModeTabNavigator = createMaterialTopTabNavigator({
    Terminal: TerminalScreen,
    Tabular: TabularScreen,
    Graphic: GraphicScreen
}, {    
    tabBarOptions: {
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.accent,
        style: {
            backgroundColor: Colors.primary,
            elevation: 0
        },
        labelStyle: {
            fontFamily: Fonts.fancy,
            fontSize: Dimensions.get('window').width*0.044,
        },
        indicatorStyle: {
            height: null,
            top: 0,
            backgroundColor: Colors.secondary
        }
    }
});

ModeTabNavigator.navigationOptions = ({navigation}) =>({
        headerLeft: () => (
            <MainButton textStyle={styles.headerIcon} onPress = {()=>navigation.goBack()}>
                <Ionicons name="md-arrow-round-back" size={42} />
            </MainButton>
        ),
        headerTitle: () => (
            <MainButton textStyle={styles.headerIcon} onPress = {()=>navigation.navigate('Help')}>
                ?
            </MainButton>
        ),
        headerRight: () => (
            <MainButton textStyle={styles.headerIcon} onPress = {()=>navigation.navigate('Settings')}>
                <Ionicons name="md-settings" size={42} />
            </MainButton>
        ),
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0,
            shadowColor: 0
        }
})

const styles = StyleSheet.create({
    headerIcon: {
        textAlign: 'center',
        color: Colors.accent,
        textShadowColor: '#ccc',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 5,
        padding: 15,
        fontSize: 37
    }
});

export default ModeTabNavigator;