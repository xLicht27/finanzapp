import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

/**
 * Proveedor de contexto para la autenticación y preferencias de seguridad del usuario.
 * Controla el inicio/cierre de sesión y la configuración del acceso biométrico.
 * 
 * @param {object} props - Propiedades del componente, incluye children.
 */
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [biometriaActiva, setBiometriaActiva] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPreferencias = async () => {
      try {
        const datosGuardados = await AsyncStorage.getItem('sesion_usuario');
        if (datosGuardados) {
          setUsuario(JSON.parse(datosGuardados));
        }
        const biometriaGuardada = await AsyncStorage.getItem('biometria_activa');
        if (biometriaGuardada) {
          setBiometriaActiva(biometriaGuardada === 'true');
        }
      } catch (e) {
      } finally {
        setCargando(false);
      }
    };
    cargarPreferencias();
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

  const cambiarBiometria = async (valor) => {
    try {
      await AsyncStorage.setItem('biometria_activa', valor ? 'true' : 'false');
      setBiometriaActiva(valor);
    } catch (e) {
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion, biometriaActiva, cambiarBiometria }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
