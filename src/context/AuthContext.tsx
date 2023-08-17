"use client";

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<boolean>(false);

export const useAuthContext = () => React.useContext(AuthContext);

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [isAuthed, setIsAuthed] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthed(true);
            } else {
                setIsAuthed(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={isAuthed}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
