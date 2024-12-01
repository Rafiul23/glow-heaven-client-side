import { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true); 
    const email = user?.email;

    return signOut(auth)
      .then(() => {
       
        if (email) {
          return axiosPublic.post("/logOut", { email }, { withCredentials: true });
        }
      })
      .finally(() => {
        setUser(null); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        setLoading(false);
      });
  };
  

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const email = currentUser?.email || user?.email;
      const userInfo = { email };
      if (currentUser) {
        axiosPublic
          .post("/jwt", userInfo, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              setLoading(false);
            }
          });
      } else {
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setUser,
    signInWithGoogle,
    createUser,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
