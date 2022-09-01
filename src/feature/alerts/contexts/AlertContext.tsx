import { createContext, useContext, useReducer } from "react"
import { Action, Alert, AlertActionTypes } from "../types";

import React from "react";


const initialState: Alert[] = [];

interface AlertContextProps {
    alerts: Alert[];
    addAlert: (alert: Alert) => void;
    removeAlert: (id: string) => void;
}


const AlertContext = createContext<AlertContextProps>({
    alerts: [],
    addAlert: () => { },
    removeAlert: () => { }
});


const reducer = (state: Alert[], action: Action): Alert[] => {
    switch (action.type) {
        case AlertActionTypes.ADD_ALERT:
            return [...state, action.payload as Alert]
        case AlertActionTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)
        default:
            return state;
    }
}

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addAlert = (alert: Alert) => {
        const id = alert.id;
        dispatch({ type: AlertActionTypes.ADD_ALERT, payload: alert });
        return setTimeout(() => {
            removeAlert(id);
        }, !alert.timeLimit ? 10000 : (alert.timeLimit * 1000));
    }

    const removeAlert = (id: string) => {
        dispatch({ type: AlertActionTypes.REMOVE_ALERT, payload: id });
    }

    return (
        <AlertContext.Provider value={{
            alerts: state,
            addAlert,
            removeAlert,
        }}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContextProvider;
export const useAlertReducer = () => useContext(AlertContext);





