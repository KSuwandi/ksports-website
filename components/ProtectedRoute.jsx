import { Navigate } from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "../src/pages/firebase";

export default function ProtectedRoute({
  children,
}) {

  const [loading, setLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {

        if (user) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }

        setLoading(false);

      }
    );

    return () => unsubscribe();

  }, []);

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        bg-black
        text-white

        flex
        items-center
        justify-center
        "
      >
        Loading...
      </div>

    );

  }

  if (!isAuth) {

    return <Navigate to="/login" />;

  }

  return children;

}