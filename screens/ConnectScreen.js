import React from 'react';
import { View, StyleSheet, Text, ToastAndroid, Dimensions } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { receiveData, setConnected } from '../store/actions/bluetooth';
import DefaultSytles from '../constants/DefaultStyles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import BluetoothList from '../components/BluetoothList';
import AppLoading from '../screens/AppLoading';

class ConnectScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { availableDevices: [], selectedId: null, isScanning: false, isConnecting: false };
    }

    componentDidMount() {
        BluetoothSerial.on('connectionLost', () => {
            this.props.setConnected(false);
            ToastAndroid.show('Connection Lost', ToastAndroid.SHORT);
        });
        BluetoothSerial.onDataAvailable(data => {
            this.props.receiveData(data);
        });
        BluetoothSerial.isConnected()
            .then((connected) => {
                if (!connected) {
                    //this.props.navigation.navigate('Main');
                    setTimeout(this.scanDevices.bind(this),
                        1000
                    )
                }
                else {
                    this.props.navigation.navigate('Main');
                }
            });            
    }

    scanDevices() {
        this.setState({ availableDevices: [], selectedId: null, isScanning: true });
        BluetoothSerial.startScan(device => {
            //If it is a new device
            if (this.state.availableDevices.findIndex(item => item.id === device.id) === -1) {
                this.setState({ availableDevices: this.state.availableDevices.concat(device) });
            }
        }).then(() => {
            ToastAndroid.show('Scan ended', ToastAndroid.SHORT);
            this.setState({ isScanning: false });
        }).catch((err) => ToastAndroid.show(err.message, ToastAndroid.SHORT));
        ToastAndroid.show('Scanning...', ToastAndroid.LONG);
    }

    async deviceConnection() {
        //loading screen
        if (this.state.selectedId !== null) {
            this.setState({ isConnecting: true });
            BluetoothSerial.connect(this.state.selectedId)
                .then(() => {
                    this.props.setConnected(true);
                    this.props.navigation.navigate('Main');
                })
                .catch((err) => ToastAndroid.show('Failed to connect to device', ToastAndroid.SHORT))
                .finally(() => this.setState({ isConnecting: false }))
        }
        else {
            ToastAndroid.show('Device not selected', ToastAndroid.SHORT);
        }
    }

    render() {
        if (this.state.isConnecting) {
            return <AppLoading message='Connecting...'/>
        }

        let refreshButton = (
            <MainButton onPress={() => this.scanDevices()}>
                <Ionicons name="md-refresh" size={42} />
            </MainButton>
        );

        if (this.state.isScanning) {
            refreshButton = null
        }

        return (
            <View style={styles.screen}>
                <View style={styles.textContainer}>
                    <Text style={DefaultSytles.bodyText}>
                        Choose the bluetooth device to get data from the
                    <Text style={{ color: Colors.accent }}> Arduino</Text>
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    <BluetoothList
                        data={this.state.availableDevices}
                        onSelect={deviceId => this.setState({ selectedId: deviceId })}
                        selectedId={this.state.selectedId}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <MainButton onPress={() => this.deviceConnection()}>CONNECT</MainButton>
                    <View style={{ padding: 30 }}>
                        {refreshButton}
                    </View>
                </View>
            </View>
        )
    }
};

ConnectScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondary
    },
    listContainer: {
        flex: Dimensions.get('window').height < 300 ? 1 : 2.5,
        width: '90%',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        width: '80%',
        justifyContent: 'flex-end'
    },
    buttonsContainer: {
        flex: 1
    }
});

export default connect(null, { receiveData, setConnected })(ConnectScreen);
