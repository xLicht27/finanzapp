import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_CACHE = 'finanzaap_tipo_cambio_cache';
const TASA_DEFECTO = 3.75;

/**
 * Obtiene la tasa de cambio de USD a PEN desde la API externa.
 * Si ocurre un error de red o no hay conexión, recupera la última tasa guardada
 * en el almacenamiento local AsyncStorage. Si no hay caché, retorna la tasa por defecto.
 * 
 * @param {string} base - Moneda base para la consulta (por defecto 'USD').
 * @returns {Promise<{tasa: number, origen: 'api' | 'cache' | 'defecto'}>} Datos de la tasa de cambio.
 */
export const obtenerTasaCambio = async (base = 'USD') => {
  try {
    const respuesta = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    if (!respuesta.ok) {
      throw new Error('Respuesta de red no válida');
    }
    const datos = await respuesta.json();
    const tasaPEN = datos.rates.PEN;

    await AsyncStorage.setItem(CLAVE_CACHE, JSON.stringify({
      tasa: tasaPEN,
      fecha: Date.now()
    }));

    return { tasa: tasaPEN, origen: 'api' };
  } catch (error) {
    try {
      const cacheGuardada = await AsyncStorage.getItem(CLAVE_CACHE);
      if (cacheGuardada) {
        const datosCache = JSON.parse(cacheGuardada);
        return { tasa: datosCache.tasa, origen: 'cache' };
      }
    } catch (errorCache) {
    }
    return { tasa: TASA_DEFECTO, origen: 'defecto' };
  }
};
