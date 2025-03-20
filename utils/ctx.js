import { useContext, createContext } from 'react';
import { useStorageState } from './useStorageState';
import axios from 'axios';
const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session_token');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password) => {
          // Perform sign-in logic here
          const auth = await axios.post('https://clear-sunfish-fairly.ngrok-free.app/auth', {
            username,
            password
          })
          if(auth) {
            setSession(auth.data.data.token);
            return true
          }
          return false
          /*
          if(user === 'admin' && pass === 'admin') {
            setSession('token');
            return true
          }
          return false
          */
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

