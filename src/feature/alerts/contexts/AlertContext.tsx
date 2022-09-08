import { createContext, useContext, useReducer } from "react"
import { Action, Alert, AlertActionTypes } from "../types";

import React from "react";
type AlertState = {
    alerts: Alert[];
};

type AlertAPI = {
    addAlert: (alert: Alert) => void;
    removeAlert: (id: string) => void;
};


const AlertDataContext = createContext<AlertState>({} as AlertState);
const AlertAPIContext = createContext<AlertAPI>({} as AlertAPI);


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

export const AlertDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, []);

    const api = React.useMemo(() => {
        const addAlert = (alert: Alert) => {
            const id = alert.id;
            dispatch({ type: AlertActionTypes.ADD_ALERT, payload: alert });
            return setTimeout(() => {
                removeAlert(id);
            }, !alert.timeLimit ? 10000 : (alert.timeLimit * 1000));
        };
        const removeAlert = (id: string) => {
            dispatch({ type: AlertActionTypes.REMOVE_ALERT, payload: id });
        };
        return { addAlert, removeAlert };
    }, []);


    return (
        <AlertAPIContext.Provider value={api}>
            <AlertDataContext.Provider value={{ alerts: state }}>
                {children}
            </AlertDataContext.Provider>
        </AlertAPIContext.Provider>
    );
};

export const useAlertState = () => useContext(AlertDataContext);
export const useAlertAPI = () => useContext(AlertAPIContext);





