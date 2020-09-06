import { RECEIVE_DATA, SEND_DATA, CLEAR_TERMINAL, CLEAR_TABULAR, CLEAR_GRAPHIC, SET_TABULAR_DATA, SET_CONNECTED } from "../actions/bluetooth";

const initialState = {
    receivedData: [],
    terminalData: '',
    tabularData: [],
    graphicData: [], 
    connected: false,
    realm: null
};

const bluetoothReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_DATA:
            //Para Terminal
            let newState = {
                ...state,
                terminalData: state.terminalData + action.data.buffer
            };

            if (action.data.complete !== null) {
                //Para Tabular
                newState = {
                    ...newState,
                    tabularData: state.tabularData.concat(action.data.complete)
                };

                //Para Graphic
                let number = Number(action.data.complete);
                if (!isNaN(number)) {
                    newState = {
                        ...newState,
                        graphicData: state.graphicData.concat(number)
                    }
                }
            }

            return newState;

        case SEND_DATA:
            return { ...state, terminalData: state.terminalData.concat(action.data) };

        case CLEAR_TERMINAL:
            return { ...state, terminalData: initialState.terminalData };

        case CLEAR_TABULAR:
            return { ...state, tabularData: initialState.tabularData };

        case CLEAR_GRAPHIC:
            return { ...state, graphicData: initialState.graphicData };

        case SET_TABULAR_DATA:
            return { ...state, tabularData: action.data };

        case SET_CONNECTED:
            return {...state, connected: action.value}

        default:
            return state;
    }
};

export default bluetoothReducer;