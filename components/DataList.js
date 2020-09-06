import React, { createRef } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';

import DefaultStyles from '../constants/DefaultStyles';
import Colors from '../constants/colors';

class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = createRef();
    }

    renderTextItem = ({ item }) => {
        return (
            <View style={{ width: Dimensions.get('window').width/this.props.numColumns }}>
                <Text style={{ ...DefaultStyles.bodyText, ...styles.text }}>
                    {item}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.dataContainer}>
                <FlatList
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        if (this.props.autoScroll)
                            this.listRef.current.scrollToEnd({ animated: false });
                    }}
                    ref={this.listRef}
                    key={this.props.numColumns + 'F'}
                    data={this.props.data}
                    numColumns={this.props.numColumns}
                    renderItem={this.renderTextItem}
                    keyExtractor={(item, index) => 't' + index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dataContainer: {
        flex: 1,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.accent
    },
    text: {
        fontSize: 18,
        textAlign: 'left',
        paddingBottom: 8,
        paddingLeft: 15,
        flex: 1,
        borderRightColor: Colors.placeHolder,
        borderRightWidth: 1
    }
});

export default DataList;