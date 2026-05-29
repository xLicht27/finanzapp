import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarSesion = async () => {
      try {
        const datosGuardados = await AsyncStorage.getItem('sesion_usuario');
        if (datosGuardados) {
          setUsuario(JSON.parse(datosGuardados));
        }
      } catch (e) {
      } finally {
        setCargando(false);
      }
    };
    cargarSesion();
  }, []);

  const iniciarSesion = async (datos) => {
    try {
      await AsyncStorage.setItem('sesion_usuario', JSON.stringify(datos));
      setUsuario(datos);
    } catch (e) {
    }
  };

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('sesion_usuario');
      setUsuario(null);
    } catch (e) {
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
