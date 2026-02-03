import { useState, useEffect } from "react"
import LoginForm from "./components/auth/LoginForm"
import HomePage from "./components/pages/HomePage"
function App() {
  const [user, setUser] = useState(null)

  function handleLogin(data){
    console.log("Login data submitted:", data)
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  }

  useEffect (() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <>
    {!user && <LoginForm setUser={setUser} onSubmit={handleLogin}/>}
    {user && <HomePage user={user} setUser={setUser} />}
    </>
  )
}

export default App
