import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ERROR_MODAL: "ERROR_MODAL",
    HIDE_MODALS: "HIDE_MODALS"
}

const CurrentModal = {
    NONE : "NONE",
    ERROR_MODAL: "ERROR_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        currentModal : CurrentModal.NONE,
        errorMessage: null,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.ERROR_MODAL: {
                console.log("error modal");
                return setAuth({
                    currentModal: CurrentModal.ERROR_MODAL,
                    errorMessage: payload.errorMessage
                })
            }
            case AuthActionType.HIDE_MODALS: {
                return setAuth({
                    currentModal: CurrentModal.NONE,
                    errorMessage: null
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        try {
            const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch {
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    errorMessage: "Please enter all required fields"
                }
            })
        }
    }

    auth.loginUser = async function(email, password) {
        try {
            const response = await api.loginUser(email, password);
            console.log("Response status: "+response.status);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch {
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    errorMessage: "Wrong email or password provided"
                }
            })
        }
        // else if (response.status === 400) {
        //     authReducer({
        //         type: AuthActionType.ERROR_MODAL,
        //         payload: {
        //             errorMessage: response.data.errorMessage
        //         }
        //     })
        //     history.push("/login/");
        // }
        // else if (response.status === 401) {
        //     console.log("BIG ERROR 401 BRUH");
        //     authReducer({
        //         type: AuthActionType.ERROR_MODAL,
        //         payload: {
        //             errorMessage: response.data.errorMessage
        //         }
        //     })
        //     history.push("/login");
        // }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.hideModals = () => {
        authReducer({
            type: AuthActionType.HIDE_MODALS,
            payload: {}
        });    
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };