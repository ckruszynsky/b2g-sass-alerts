export function isUrl(s: string) {
    const regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
    return regexp.test(s);
}



export function validateInput(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setErrors: (errors: any) => void,
    propName: string,
    errorMessage: string,
    errors: {
        [key: string]: string
    },
) {
    if (!event.target.value) {
        setErrors({ ...errors, [propName]: errorMessage });
    } else {
        const updatedErrors = { ...errors };
        delete updatedErrors[propName];
        setErrors(updatedErrors);
    }
}

export function validateURLInput(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setErrors: (errors: any) => void,
    propName: string,
    errorMessage: string,
    errors: {
        [key: string]: string
    },
) {
    if (event.target.value === '') {
        setErrors({ ...errors, [propName]: `${event.target.name} is required.` });
    }
    else if (!isUrl(event.target.value)) {
        setErrors({ ...errors, [propName]: errorMessage });
    } else {
        const updatedErrors = { ...errors };
        delete updatedErrors[propName];
        setErrors(updatedErrors);
    }
}