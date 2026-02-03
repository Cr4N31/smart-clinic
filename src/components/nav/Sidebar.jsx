function Sidebar({ currentPage, setCurrentPage, setUser }) {
    const sideBarItems = [
        { id: 'register', label: 'Register Residents' },
        { id: 'view', label: 'View Residents' }
    ]

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <nav>
            <div>
                <ul>
                    {sideBarItems.map((item) => {
                        return <li key={item.id}>
                            <button onClick={() => setCurrentPage(item.id)}>{item.label}</button>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Sidebar;