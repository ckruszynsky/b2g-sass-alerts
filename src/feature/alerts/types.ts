
export type Alert = {
    id: string;
    timeLimit?: number;
    text: string;
    link: string;
    type: AlertType;
    title: string,
};

export function CreateDefaultAlert(type: AlertType = 'info'): Alert {
    return {
        timeLimit: 10,
        text: '',
        link: '',
        type: type,
        title: '',
        id: ''
    };
}

export enum AlertActionTypes {
    ADD_ALERT = 'ADD_ALERT',
    REMOVE_ALERT = 'REMOVE_ALERT',
};

export type Action = {
    type: keyof typeof AlertActionTypes;
    payload: Alert | string;
}

export type AlertType = 'success' | 'danger' | 'warning' | 'info';
