import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';

import Colors from '../constants/colors';
import Fonts from '../constants/Fonts';

const Graphic = props => {

    let yAxis = yAxis = <YAxis
    style = {{paddingLeft: 30}}
        data={props.data}
        contentInset={{ top: 3, bottom: 3 }}
        svg={{
            fill: Colors.primary,
            fontSize: 15,
            fontFamily: Fonts.fancy
        }}
        numberOfTicks={props.numberOfTicks}
    />;

    if (!props.hasTicks) {
        yAxis = null;
    }

    return (
        <View style={styles.graphContainer}>
            {yAxis}
            <LineChart
                style={{ width: '100%', height: Dimensions.get('window').height * 0.35 }}
                data={props.data}
                svg={{ stroke: Colors.accent, strokeWidth: 3 }}
                contentInset={{ top: 3, bottom: 3 }}
            >
                <Grid />
            </LineChart>
        </View>
    );
}

Graphic.defaultProps = {
    numberOfTicks: 10
}

const styles = StyleSheet.create({
    graphContainer: {
        flexDirection: 'row'
    }
});

export default Graphic;