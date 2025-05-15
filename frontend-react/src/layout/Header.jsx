import HeaderGuest from "./HeaderGuest";
import HeaderClient from "./HeaderClient";
import HeaderWorker from "./HeaderWorker";



function Header({ user }) {
    const [showGuest, setShowGuest] = useState(false);
    const [showClient, setShowClient] = useState(false);
    const [showWorker, setShowWorker] = useState(false);

    if (user.loggedIn) {
        if (user.user.worker) {
            setShowWorker(true)
            setShowClient(false)
            setShowGuest(false)
        } else {
            setShowWorker(false)
            setShowClient(true)
            setShowGuest(false)
        }
    } else {
        setShowWorker(false)
        setShowClient(false)
        setShowGuest(true)
    }




    return (
        <>
        {showGuest && <HeaderGuest />}
        {showClient && <HeaderClient />}
        {showWorker && <HeaderWorker />}

        </>

        )
}

export default Header