import { useState, useEffect } from 'react';
import { obtenerTasaCambio } from '../services/tipoCambioServicio';

/**
 * Gancho personalizado para gestionar el tipo de cambio de una moneda base.
 * Controla los estados de carga, error y permite refrescar los datos.
 * Utiliza un servicio con soporte de caché sin conexión.
 * 
 * @param {string} monedaBase - Moneda de origen para obtener la tasa (por defecto 'USD').
 * @returns {object} Estados del hook: tasa, cargando, error y la función refrescar.
 */
const useTipoCambio = (monedaBase = 'USD') => {
  const [tasa, setTasa] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtener = async () => {
      try {
        setCargando(true);
        setError(null);
        const resultado = await obtenerTasaCambio(monedaBase);
        setTasa(resultado.tasa);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtener();
  }, [monedaBase]);

  const refrescar = async () => {
    try {
      setCargando(true);
      setError(null);
      const resultado = await obtenerTasaCambio(monedaBase);
      setTasa(resultado.tasa);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { tasa, cargando, error, refrescar };
};

export default useTipoCambio;
