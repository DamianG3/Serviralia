import HeaderGuest from "./HeaderGuest";
import HeaderClient from "./HeaderClient";
import HeaderWorker from "./HeaderWorker";
import { useState, useEffect } from 'react';

function Header({ user }) {
    const [showGuest, setShowGuest] = useState(false);
    const [showClient, setShowClient] = useState(false);
    const [showWorker, setShowWorker] = useState(false);

    useEffect(() => {
        if (user.loggedIn) {
            if (user.user.idWorker) {
                console.log("Header Worker");
                setShowWorker(true);
                setShowClient(false);
                setShowGuest(false);
            } else {
                console.log("Header Client");
                setShowWorker(false);
                setShowClient(true);
                setShowGuest(false);
            }
        } else {
            console.log("Header Guest");
            setShowWorker(false);
            setShowClient(false);
            setShowGuest(true);
        }
    }, [user]); // Only re-run the effect if user changes

    
    return (
        <>
            {showGuest && <HeaderGuest />}
            {showClient && <HeaderClient user={user} />}
            {showWorker && <HeaderWorker user={user} />}
        </>
    );
}

export default Header;