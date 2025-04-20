let authFailuier = true
export function handleResponseError(appInstance, error) {
    let toast = appInstance && appInstance.config.globalProperties.$toast
    if (error.response) {
        const { status, data } = error.response;
        toast.error(data.message);
        if (status === 403) {
            toast.error("Forbidden: " + data.message);
        }
        if (data.message === "Unauthenticated." && authFailuier ) {
            authFailuier = false;
            toast.error("Try Login for more Accessibility");
        }
    }
}

export function handleRequestError(appInstance, error) {
    let toast = appInstance && appInstance.config.globalProperties.$toast
    toast.error(error);
}

export function handleNetworkError(appInstance, error){
    let toast = appInstance && appInstance.config.globalProperties.$toast
    toast.error("Network Error , Please check your Internet");
}

