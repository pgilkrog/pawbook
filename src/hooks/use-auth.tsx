import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import firebase from '../firebase';
import { IUser } from '../interfaces/IUser';

interface Props {
    children: ReactNode
}

interface IContextProps {
    user: any;
    signin: (email: string, password: string) => any;
    signup: (user: any) => any;
    signout: () => any;
    sendPasswordResetEmail: (email: string) => any;
    confirmPasswordReset: (code: any, password: string) => any;
    updateUser: (user: any) => any;
}

const authContext = createContext({} as IContextProps);

export const ProviderAuth: React.FC<Props> = ({ children }) => {
    const auth = useProviderAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

const useProviderAuth = () => {
    const [user, setUser] = useState<IUser | null | undefined | firebase.User>();

    const signin = (email: string, password: string) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log("[user-auth]", response.user)
                setUser(response.user);
                return response.user;
            })
            .catch(error => console.log(error));
    };

    const signup = (user: any) => {
        return firebase 
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
                response.user?.updateProfile({
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }).then(() => {
                    setUser(response.user);
                })
                firebase.database().ref('users').push({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                })
                return response.user;
            })
            .catch(error => console.log(error));
    };

    const signout = () => {
        return firebase 
            .auth()
            .signOut()
            .then(() => {
                setUser(null);             
            })
            .catch(error => console.log(error));            
    };

    const sendPasswordResetEmail = (email: string) => {
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };

    const confirmPasswordReset = (code: any, password: string) => {
        return firebase 
            .auth()
            .confirmPasswordReset(code, password)
            .then(() => {
                return true;
            });
    };

    const updateUser = (updatedUser: any) => {
        return firebase
            .auth()
            .currentUser?.updateProfile({
                displayName: updatedUser.displayName,
                photoURL: updatedUser.photoURL
            })
            .then(response => {
                console.log(response);
            })
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [user]);

    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
        updateUser
    }
}