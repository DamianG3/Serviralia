
function HeaderClient() {
    

    return (<>
        
{/* Dropdown de perfil */}
<li className="nav-item dropdown mx-2">
    <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="profileDropdown" role="button"
        data-bs-toggle="dropdown" aria-expanded="false">

        {
        user.user.pfp ? (
        <img src={"http://localhost:3000/images/" + user.user.pfp} onError={(e)=> {
        e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
        }}
        className="icon-image"
        width={50}
        alt={user.user.pfp}
        />

        ) : (
        <img src="http://localhost:3000/images/icon.jpg" className="icon-image" width={50} alt={user.user.pfp} />
        )

        }
        <span>{user.user.firstName}</span>
    </a>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
        <li>
            <a className="dropdown-item" href="/ClientEditProfile">
                Editar perfil
            </a>
        </li>
        <li>
            <hr className="dropdown-divider" />
        </li>
        <li>
            <a className="dropdown-item text-danger" href="/">
                Cerrar sesión
            </a>
        </li>
    </ul>
</li>


    </>)
}

export default HeaderClient