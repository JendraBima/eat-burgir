import Cookie from "js-cookie";

export const getToken = () => {
  return Cookie.get("jwt");
};

export const getHeaderToken = () => {
    const token = getToken();
    return {
        Authorization: `Bearer ${token}`,
    };
}

export const setToken = (token) => {
    Cookie.set("jwt", token, { 
        expires: 7,
        path: '/',
        sameSite: 'Lax'
    });
}

export const removeToken = () => {
    Cookie.remove("jwt");
    Cookie.remove("jwt_refresh");
}