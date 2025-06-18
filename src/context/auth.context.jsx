import { createContext, useState, useEffect } from "react";
import SpinnerButton from "../components/SpinnerButton/SpinnerButton"; 
import service from "../services/service.config"

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [authError, setAuthError] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
    // Actualiza el token en la instancia service
    service.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
    delete service.defaults.headers.common["Authorization"];
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setIsValidatingToken(false);
      return;
    }

    // Aseguramos que el token esté en el header del service
    service.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await service.get("/auth/verify");

      setUser(response.data.payload);
      setIsLoggedIn(true);
      setAuthError(null);
    } catch (err) {
      console.error("Error verificando token:", err);
      setUser(null);
      setIsLoggedIn(false);
      if (err.response?.data?.msg) {
        setAuthError(err.response.data.msg);
      } else {
        setAuthError("Token inválido o expirado");
      }
      removeToken();
    } finally {
      setIsValidatingToken(false);
    }
  };

  const logOutUser = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const contextValue = {
    isLoggedIn,
    user,
    authError,
    authenticateUser,
    storeToken,
    logOutUser,
  };

  if (isValidatingToken) {
    return (
      <div className="d-flex justify-content-center my-5">
        <SpinnerButton />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
