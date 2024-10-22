import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = () => {
    confirmLogout();
    setShowPopup(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    router.push("/");
  };

  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 w-full fixed top-0 backdrop-blur-xl px-6">
        <h1 className="text-gray-700 text-2xl">
          {router.pathname === '/' ? (
            <Link href="/">Personal Stress Analysis</Link>
          ) : (
            <Link href="/vital">Personal Stress Analysis</Link>
          )}
        </h1>
     
      <button onClick={handleLogout} className="flex items-center gap-4 cursor-pointer">
       <h2 className="hidden sm:flex"> Logout </h2><FaSignOutAlt className="text-gray-700" />
      </button>
      
      {showPopup && (
        <div className="popup">
          <p>Are you sure you want to logout?</p>
          <button onClick={handleConfirmLogout}>Yes</button>
          <button onClick={() => setShowPopup(false)}>No</button>
        </div>
      )}
    </div>
  );
}
