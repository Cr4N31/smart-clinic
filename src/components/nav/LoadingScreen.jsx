import logo from "../../assets/smartclinic.png"; // Path to your generated logo

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-indigo-200 z-50">
      {/* Logo */}
      <img src={logo} alt="Smart Clinic Logo" className="w-36 h-36 mb-6 animate-pulse" />
      

      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingScreen;
