export const getUser = ( ) => {
    const user = sessionStorage.getItem("user");
    if(user){return JSON.parse(user)}
    return null;
}

export const getToken = ( ) => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (token,user ) => {
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const removeUserSession = ( ) => {   
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

}