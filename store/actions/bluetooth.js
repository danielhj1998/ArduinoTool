export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SEND_DATA = 'SEND_DATA';
export const CLEAR_TERMINAL = 'CLEAR_TERMINAL';
export const CLEAR_TABULAR = 'CLEAR_TABULAR';
export const CLEAR_GRAPHIC = 'CLEAR_GRAPHIC';
export const SET_TABULAR_DATA = 'SET_TABULAR_DATA';
export const SET_CONNECTED = 'SET_CONNECTED';

export const receiveData = data =>{
    return {type: RECEIVE_DATA, data: data};
}

export const sendData = data =>{
    return {type: SEND_DATA, data: data};
}

export const clearTerminal = () =>{
    return {type: CLEAR_TERMINAL};
}

export const clearTabular = () =>{
    return {type: CLEAR_TABULAR};
}

export const clearGraphic = () =>{
    return {type: CLEAR_GRAPHIC};
}

export const setTabularData = (newTabularData) =>{
    return {type: SET_TABULAR_DATA, data: newTabularData};
}

export const setConnected = connected =>{
    return {type: SET_CONNECTED, value: connected};
}