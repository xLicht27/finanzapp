import { useState, useEffect } from 'react';

const useTipoCambio = (monedaBase = 'USD') => {
  const [tasa, setTasa] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtener = async () => {
      try {
        setCargando(true);
        setError(null);
        const respuesta = await fetch(`https://api.exchangerate-api.com/v4/latest/${monedaBase}`);
        const datos = await respuesta.json();
        setTasa(datos.rates.PEN);
      } catch (err) {
        setError(err.message);
        setTasa(3.7);
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
      const respuesta = await fetch(`https://api.exchangerate-api.com/v4/latest/${monedaBase}`);
      const datos = await respuesta.json();
      setTasa(datos.rates.PEN);
    } catch (err) {
      setError(err.message);
      setTasa(3.7);
    } finally {
      setCargando(false);
    }
  };

  return { tasa, cargando, error, refrescar };
};

export default useTipoCambio;
