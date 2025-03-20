import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Función para obtener el token de Secure Store
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("session_token");
  } catch (error) {
    console.error("Error obteniendo el token:", error);
    return null;
  }
};

// Crear una instancia de Axios
const api = axios.create({
  baseURL: "https://clear-sunfish-fairly.ngrok-free.app",
  timeout: 10000, // Timeout de 10 segundos
});

// Interceptor para agregar el token en cada petición
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      console.log("Token:", `Bearer ${token}`);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores
api.interceptors.response.use(
  (response) => response, // Si la respuesta es correcta, la devuelve sin modificar
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      // Si el token expiró, elimina el token y redirige a login
      if (status === 401) {
        console.log("Token expirado, redirigiendo a login...");
        await SecureStore.deleteItemAsync("token");
        // Aquí podrías navegar al login, si usas React Navigation
      }

      // Manejo de otros errores
      if (status === 500) {
        console.error("Error interno del servidor");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
