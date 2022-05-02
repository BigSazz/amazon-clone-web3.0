import { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");

    const { authenticate, isAuthenticated, enableWeb3, Moralis, user, isWeb3Enabled} = useMoralis();

    useEffect(() => {
        (async () => {
            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname');
                setUsername(currentUsername);
            }
        })()
    }, [isAuthenticated, user, username]);

    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname);
                user.save();
                setNickname('');
                // reload page after setting nickname using setTimeout
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            } else {
                console.log('Please enter a nickname');
            }
        } else {
            console.log("No User");
        }
    }

    return (
        <AmazonContext.Provider
            value = {{
                isAuthenticated,
                nickname,
                setNickname,
                username,
                handleSetUsername
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}