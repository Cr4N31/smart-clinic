import { useState, useEffect } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import LoginForm from "./components/auth/LoginForm"
import HomePage from "./components/pages/HomePage"
import LoadingScreen from "./components/nav/LoadingScreen";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  function handleLogin(data){
     setLoading(true); // Show loading screen
     setTimeout(() => {
      setUser(data); // Fake API delay
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
    }, 1500); // 1.5s delay for demo
  }

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    // Keep loading for at least 500ms so the user sees the screen
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [])

  if (loading) return <LoadingScreen />;

  return (
    <>
      {!user && <LoginForm setUser={setUser} onSubmit={handleLogin}/>}
      {user && <HomePage user={user} setUser={setUser} />}
    </>
  )
}

export default App
