import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TEMAS } from '../styles/globales';

const TemaContext = createContext(null);

const diccionario = {
  Español: {
    hola: 'Hola',
    actividadReciente: 'Actividad Reciente',
    verTodo: 'Ver todo',
    tipoCambio: 'Tipo de cambio USD/PEN: S/.',
    ahorroMesAnterior: 'Ahorro vs Mes Anterior',
    excelente: '✓ Excelente',
    incremento: 'incremento',
    gastosCategoria: 'Gastos por Categoría',
    desgloseDetallado: 'Desglose Detallado',
    hogar: 'Hogar',
    alimentacion: 'Alimentación',
    transporte: 'Transporte',
    hipotecasServicios: 'Hipotecas, Servicios',
    superRestaurantes: 'Súper, Restaurantes',
    gasolinaPeajes: 'Gasolina, Peajes',
    meses: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    serviciosUtiles: 'SERVICIOS ÚTILES PARA EL AHORRO',
    metasAhorro: 'Metas de Ahorro',
    deslizaTarjeta: 'Desliza una tarjeta para editar o eliminar.',
    optimizacionAi: 'OPTIMIZACIÓN AI',
    analisisCartera: 'Análisis de Cartera',
    descripcionAi: 'Permite que la IA te dé un análisis completo sobre los gastos realizados y te otorgue recomendaciones.',
    ejecutarDiagnostico: 'EJECUTAR DIAGNÓSTICO',
    diagnosticoCompletado: '✓ DIAGNÓSTICO COMPLETADO',
    nuevaMeta: 'Nueva Meta de Ahorro',
    editarMeta: 'Editar Meta',
    nombreMeta: 'Nombre de la meta',
    ahorroActual: 'Ahorro actual ($)',
    montoObjetivo: 'Monto objetivo ($)',
    plazoOpcional: 'Plazo (opcional)',
    guardarMeta: 'Guardar Meta',
    actualizarMeta: 'Actualizar Meta',
    cancelar: 'Cancelar',
    ajustes: 'Ajustes',
    ajustesGenerales: 'Ajustes Generales',
    editarPerfil: 'Editar Perfil',
    privacidadControl: 'Privacidad y Control',
    notificaciones: 'Notificaciones',
    accesibilidad: 'Accesibilidad',
    eliminarCuenta: 'Eliminar mi Cuenta',
    modoVisual: 'Modo Visual',
    claro: 'Claro',
    oscuro: 'Oscuro',
    sistema: 'Sistema',
    tamanoTexto: 'Tamaño de Texto',
    ajustesVision: 'Ajustes de Visión',
    altoContraste: 'Alto Contraste',
    descripcionContraste: 'Aumenta el contraste de colores de la interfaz',
    asistenciaTecnica: 'Asistencia Técnica',
    lectorPantalla: 'Lector de Pantalla',
    descripcionLector: 'Activa la descripción de voz para elementos visuales',
    regionIdioma: 'Región e Idioma',
    idioma: 'Idioma',
  },
  Inglés: {
    hola: 'Hello',
    actividadReciente: 'Recent Activity',
    verTodo: 'View all',
    tipoCambio: 'USD/PEN exchange rate: S/.',
    ahorroMesAnterior: 'Savings vs Previous Month',
    excelente: '✓ Excellent',
    incremento: 'increase',
    gastosCategoria: 'Expenses by Category',
    desgloseDetallado: 'Detailed Breakdown',
    hogar: 'Home',
    alimentacion: 'Food',
    transporte: 'Transport',
    hipotecasServicios: 'Mortgages, Utilities',
    superRestaurantes: 'Grocery, Restaurants',
    gasolinaPeajes: 'Gas, Tolls',
    meses: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    serviciosUtiles: 'USEFUL SERVICES FOR SAVINGS',
    metasAhorro: 'Savings Goals',
    deslizaTarjeta: 'Swipe a card to edit or delete.',
    optimizacionAi: 'AI OPTIMIZATION',
    analisisCartera: 'Wallet Analysis',
    descripcionAi: 'Allow AI to give you a full analysis of your expenses and provide recommendations.',
    ejecutarDiagnostico: 'RUN DIAGNOSTIC',
    diagnosticoCompletado: '✓ DIAGNOSTIC COMPLETED',
    nuevaMeta: 'New Savings Goal',
    editarMeta: 'Edit Goal',
    nombreMeta: 'Goal Name',
    ahorroActual: 'Current savings ($)',
    montoObjetivo: 'Target amount ($)',
    plazoOpcional: 'Deadline (optional)',
    guardarMeta: 'Save Goal',
    actualizarMeta: 'Update Goal',
    cancelar: 'Cancel',
    ajustes: 'Settings',
    ajustesGenerales: 'General Settings',
    editarPerfil: 'Edit Profile',
    privacidadControl: 'Privacy & Control',
    notificaciones: 'Notifications',
    accesibilidad: 'Accessibility',
    eliminarCuenta: 'Delete my Account',
    modoVisual: 'Visual Mode',
    claro: 'Light',
    oscuro: 'Dark',
    sistema: 'System',
    tamanoTexto: 'Text Size',
    ajustesVision: 'Vision Settings',
    altoContraste: 'High Contrast',
    descripcionContraste: 'Increases contrast of UI colors',
    asistenciaTecnica: 'Technical Assistance',
    lectorPantalla: 'Screen Reader',
    descripcionLector: 'Enables voice description for visual elements',
    regionIdioma: 'Region & Language',
    idioma: 'Language',
  }
};

export const TemaProvider = ({ children }) => {
  const esquemaSistema = useColorScheme();
  const [modoVisual, setModoVisual] = useState('Oscuro');
  const [altoContraste, setAltoContraste] = useState(false);
  const [idioma, setIdioma] = useState('Español');

  useEffect(() => {
    const cargarPreferencias = async () => {
      try {
        const modoGuardado = await AsyncStorage.getItem('modo_visual');
        const contrasteGuardado = await AsyncStorage.getItem('alto_contraste');
        const idiomaGuardado = await AsyncStorage.getItem('idioma_app');

        if (modoGuardado) setModoVisual(modoGuardado);
        if (contrasteGuardado) setAltoContraste(contrasteGuardado === 'true');
        if (idiomaGuardado) setIdioma(idiomaGuardado);
      } catch (e) {
      }
    };
    cargarPreferencias();
  }, []);

  const cambiarModoVisual = async (nuevoModo) => {
    try {
      await AsyncStorage.setItem('modo_visual', nuevoModo);
      setModoVisual(nuevoModo);
    } catch (e) {
    }
  };

  const cambiarAltoContraste = async (nuevoValor) => {
    try {
      await AsyncStorage.setItem('alto_contraste', nuevoValor ? 'true' : 'false');
      setAltoContraste(nuevoValor);
    } catch (e) {
    }
  };

  const cambiarIdioma = async (nuevoIdioma) => {
    try {
      await AsyncStorage.setItem('idioma_app', nuevoIdioma);
      setIdioma(nuevoIdioma);
    } catch (e) {
    }
  };

  const obtenerModoActivo = () => {
    if (modoVisual === 'Sistema') {
      return esquemaSistema === 'light' ? 'claro' : 'oscuro';
    }
    return modoVisual === 'Claro' ? 'claro' : 'oscuro';
  };

  const modoActivo = obtenerModoActivo();

  let colores;
  if (modoActivo === 'claro') {
    colores = altoContraste ? TEMAS.claroContraste : TEMAS.claro;
  } else {
    colores = altoContraste ? TEMAS.oscuroContraste : TEMAS.oscuro;
  }

  const t = (clave) => {
    const traduccionesActuales = diccionario[idioma] || diccionario.Español;
    return traduccionesActuales[clave] || clave;
  };

  return (
    <TemaContext.Provider value={{
      modoVisual,
      altoContraste,
      idioma,
      colores,
      cambiarModoVisual,
      cambiarAltoContraste,
      cambiarIdioma,
      t
    }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
