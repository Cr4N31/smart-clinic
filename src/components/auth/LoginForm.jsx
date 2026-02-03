import { useState } from "react"
function LoginForm({onSubmit}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e){
            e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.")
            return
        }

        if (!username || !password) {
            setError("Both fields are required.")
            return
        }

        setError("")
        onSubmit({ username, password })
    }


    
    return(
        <form onSubmit={handleSubmit}>
            <h1>Company Name</h1>
            <h2>Login to your account</h2>
            <div>
                <label htmlFor="Username">Username</label>
                <input type="text" id="Username" name="Username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <input type="password" id="Password" name="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm