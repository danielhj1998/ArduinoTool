import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainButton from './MainButton';
import BottomBar from './BottomBar';

const TabularOptions = props => {
    return (
        <BottomBar>
            <MainButton
                style={{ paddingHorizontal: 20 }}
                onPress={props.onClear}
            >
                <MaterialCommunityIcons name="broom" size={42} />
            </MainButton>
            <MainButton
                style={{ paddingHorizontal: 20 }}
                onPress={props.onSave}
            >
                <Ionicons name="md-save" size={42} />
            </MainButton>
            <MainButton
                style={{ paddingHorizontal: 20 }}
                onPress={props.onAdd}
            >
                <Ionicons name="md-add" size={42} />
            </MainButton>
        </BottomBar>
    );
}

export default TabularOptions;