let accessToken = null;

export function setAccessToken(token){
    accessToken = token;
}

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
    accessToken = null;
}