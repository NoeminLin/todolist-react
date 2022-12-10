import { createContext, useState, useEffect } from 'react';
import { register, login, checkPermission } from 'api/auth';
import * as jwt from 'jsonwebtoken';
import { useLocation, navigate } from 'react-router-dom';
import { useContext } from 'react';


const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
}

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const checkTockenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }

      const result = await checkPermission(authToken);
      if (!result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        if (tempPayload) {
          setPayload(tempPayload);
          setIsAuthenticated(true);
          localStorage.setItem('authToken', authToken);
        } else {
          setPayload(null);
          setIsAuthenticated(false);
        }
      }
    }

    checkTockenIsValid();
  }, [pathname]);

  return (<AuthContext.Provider
    value={{
      isAuthenticated: isAuthenticated,
      currentMember: payload && {
        id: payload.sub,
        name: payload.name
      },
      register: async (data) => {
        const { success, authToken } = await register({
          username: data.username,
          email: data.email,
          password: data.password
        });
        const tempPayload = jwt.decode(authToken);
        if (tempPayload) {
          setPayload(tempPayload);
          setIsAuthenticated(true);
          localStorage.setItem('authToken', authToken);
        } else {
          setPayload(null);
          setIsAuthenticated(false);
        }
        return success;
      },
      login: async (data) => {
        const { success, authToken } = await login({
          username: data.username,
          password: data.password
        });
        const tempPayload = jwt.decode(authToken);
        if (tempPayload) {
          setPayload(tempPayload);
          setIsAuthenticated(true);
          localStorage.setItem('authToken', authToken);
        } else {
          setPayload(null);
          setIsAuthenticated(false);
        }
        return success;
      },
      logout: () => {
        localStorage.removeItem('authToken');
        setPayload(null);
        setIsAuthenticated(false);
      }
    }}
  >
    {children}
  </AuthContext.Provider>)
};