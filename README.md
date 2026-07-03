# FinanZaap Mobile

FinanZaap es una aplicación móvil multiplataforma diseñada para el control financiero personal, la categorización inteligente de gastos y la planificación de metas de ahorro. Desarrollada sobre React Native y Expo, la aplicación ofrece una experiencia fluida con soporte global de temas reactivos, alta accesibilidad y una arquitectura estructurada y escalable.

## Estructura de Archivos del Proyecto

A continuación se detalla el árbol completo de archivos del proyecto con anotaciones y notas explicativas en español para cada uno de los directorios y componentes principales:

```
finanzapp-mobile/
├── assets/                                 # Recursos visuales estáticos e imágenes del proyecto
│   └── logo.png                            # Logotipo principal de la marca FinanZaap
├── src/                                    # Directorio contenedor del código fuente
│   ├── components/                         # Módulo de componentes visuales interactivos y reutilizables
│   │   ├── CategoriaBar.js                 # Barra visual para desglosar el gasto por porcentaje en categorías
│   │   ├── CustomButton.js                 # Botón táctil estilizado con animaciones y spinner de carga
│   │   ├── MetaAhorroCard.js               # Tarjeta con barras de progreso para el seguimiento de metas de ahorro
│   │   ├── PresupuestoBadge.js             # Recuadro con el presupuesto restante y el estado de la meta diaria
│   │   └── TransaccionItem.js              # Renglón con ícono dinámico para detallar gastos o ingresos individuales
│   ├── context/                            # Proveedores de estado y contextos globales de la aplicación
│   │   ├── AuthContext.js                  # Maneja la sesión del usuario (inicio de sesión, datos y cierre)
│   │   └── TemaContext.js                  # Controla el tema visual (Modos y Alto Contraste) e idiomas (Traducciones)
│   ├── hooks/                              # Ganchos o hooks personalizados de lógica reactiva
│   │   └── useTipoCambio.js                # Consume API de tipo de cambio de divisas con estados de carga
│   ├── navigation/                         # Configuración y enrutadores de los flujos de navegación
│   │   ├── AppNavigator.js                 # Flujo principal compuesto de pestañas inferiores y pila de ajustes
│   │   ├── AuthNavigator.js                # Flujo de autenticación (pantallas de Login y Registro)
│   │   └── RootNavigator.js                # Decisor raíz que alterna flujos según el estado de la sesión
│   ├── screens/                            # Pantallas o interfaces completas de la aplicación
│   │   ├── AjustesAccesibilidadScreen.js   # Permite configurar el tema, alto contraste, tamaño de texto e idioma
│   │   ├── AjustesEliminarCuentaScreen.js   # Flujo guiado de 5 pasos para eliminar la cuenta con validación local
│   │   ├── AjustesNotificacionesScreen.js   # Configura las alertas sobre gastos excesivos, promociones y avisos
│   │   ├── AjustesPrivacidadScreen.js       # Controla el acceso de la IA a fuentes de datos y muestra logs
│   │   ├── AjustesScreen.js                 # Menú general con accesos al perfil y las configuraciones de la app
│   │   ├── HomeScreen.js                    # Tablero de inicio que muestra el presupuesto diario y las transacciones
│   │   ├── LoginScreen.js                   # Formulario de acceso a la cuenta con validación de correo y contraseña
│   │   ├── ProfileScreen.js                 # Detalla el perfil del usuario activo y opción de cierre de sesión
│   │   ├── RegisterScreen.js                # Formulario interactivo por pasos para dar de alta cuentas nuevas
│   │   ├── ReportesScreen.js                # Tablero estadístico con resúmenes de ahorro y desgloses gráficos
│   │   └── ServiciosScreen.js               # Módulo de metas de ahorro deslizables y diagnóstico de cartera por IA
│   └── styles/                             # Hojas de estilo modulares desacopladas de la lógica funcional
│       ├── AjustesAccesibilidadScreenEstilos.js  # Reglas de diseño para la vista de accesibilidad
│       ├── AjustesEliminarCuentaScreenEstilos.js  # Diseño visual del flujo guiado de eliminación de cuenta
│       ├── AjustesNotificacionesScreenEstilos.js  # Estilos para los textos descriptivos de alertas
│       ├── AjustesPrivacidadScreenEstilos.js      # Diseño del historial IA, logs y zona de peligro
│       ├── AjustesScreenEstilos.js                # Reglas de maquetación del panel principal de ajustes y avatar
│       ├── HomeScreenEstilos.js                   # Estilos del saludo e indicador de tipo de cambio
│       ├── LoginScreenEstilos.js                  # Diseño del formulario de acceso, logo y recuadros de error
│       ├── ProfileScreenEstilos.js                # Diseño del perfil y los botones de sesión
│       ├── RegisterScreenEstilos.js               # Diseño del formulario de registro y su indicador de pasos
│       ├── ReportesScreenEstilos.js               # Estilos para el selector de meses y gráficos de barras
│       ├── ServiciosScreenEstilos.js              # Diseño de los botones swipeable de las tarjetas y modales
│       ├── componentes.js                         # Hojas de estilo individuales para componentes de la carpeta components
│       └── globales.js                            # Paleta de colores para los 4 temas y contenedores base comunes
├── App.js                                  # Punto de entrada raíz de la estructura de componentes React Native
├── app.json                                # Archivo de manifiesto de Expo para compilar y empaquetar la app
├── index.js                                # Registra y lanza la aplicación en el hilo principal
└── package.json                            # Declaración de dependencias del proyecto y scripts npm de inicio
```

## Análisis de la Arquitectura del Proyecto

El código fuente de la aplicación se organiza dentro del directorio raíz `src/`, el cual distribuye las responsabilidades en la siguiente jerarquía de carpetas:

*   **`components/`**: Contiene componentes visuales y widgets reutilizables de la interfaz de usuario. Ninguno de estos componentes almacena lógica de navegación pesada, actuando principalmente como componentes de presentación.
*   **`context/`**: Proveedores de estado global para la aplicación. Centraliza los contextos esenciales como `AuthContext.js` para controlar la sesión del usuario y `TemaContext.js` para administrar las preferencias visuales e idiomáticas de forma global.
*   **`hooks/`**: Custom hooks que encapsulan la lógica de negocio y llamadas a servicios externos, como la sincronización con APIs externas de tipos de cambio de divisas.
*   **`navigation/`**: Define la estructura de navegación de la aplicación mediante navegadores de pila nativa y navegadores de pestañas inferiores, conectando de forma fluida el flujo de autenticación con el flujo principal de pantallas.
*   **`screens/`**: Vistas o pantallas completas de la aplicación (como Inicio, Reportes, Servicios y los submenús de Ajustes). Se encargan de enlazar los componentes y consumir los contextos correspondientes.
*   **`styles/`**: Directorio dedicado a la gestión visual que aísla por completo el diseño de la lógica funcional, emulando una organización limpia tipo web de hojas de estilo independientes.

## Documentación del Esquema de Estilos Modulares

El sistema visual de FinanZaap ha sido completamente refactorizado para eliminar dependencias de archivos estáticos centralizados como `theme.js`. El nuevo diseño se organiza a través de los siguientes archivos en `src/styles/`:

1.  **`globales.js`**: Define las paletas cromáticas reactivas para los modos Claro, Oscuro y Alto Contraste, además de las hojas de estilo comunes compartidas por las pantallas (SafeAreas, contenedores base, cabeceras y márgenes estándar).
2.  **`componentes.js`**: Reúne las hojas de estilo exclusivas de los componentes compartidos ubicados en `src/components/`, incluyendo comentarios de sección breves para identificar cada bloque.
3.  **Hojas de Estilo por Pantalla**: Cada pantalla en `src/screens/` posee su propia hoja de estilos dedicada y homónima dentro de `src/styles/` (por ejemplo, `HomeScreenEstilos.js`, `AjustesScreenEstilos.js`, etc.). Esto garantiza la modularidad y evita hojas de estilo sobredimensionadas, permitiendo que cada vista consuma exclusivamente sus reglas de diseño mediante funciones reactivas que reciben los colores actuales del tema activo.

Todos los archivos de diseño omiten el uso de propiedades exclusivas de plataformas específicas como `elevation` de Android, implementando en su lugar sombras y bordes nativos multiplataforma.

## Funcionalidades Clave

### Accesibilidad y Personalización Visual Reactiva
Mediante el proveedor global `TemaContext.js`, la interfaz se adapta en tiempo real a las preferencias del usuario:
*   **Modo Claro**: Paleta de colores optimizada para la lectura en entornos de alta luminosidad.
*   **Modo Oscuro**: Interfaz diseñada para reducir la fatiga visual con colores de fondo de baja intensidad.
*   **Alto Contraste**: Variante cromática optimizada con relaciones de contraste elevadas para usuarios con dificultades visuales.

### Flujo de Eliminación de Cuenta de Seguridad
Ubicado en `AjustesEliminarCuentaScreen.js`, el flujo consta de una secuencia de 5 pasos diseñada para evitar pérdidas accidentales de datos:
1.  **Confirmación Inicial**: Advertencia sobre el carácter irreversible de la acción.
2.  **Código SMS**: Envío simulado de un código al dispositivo del usuario. Cuenta con un control local de errores que fuerza un fallo en el primer intento del código ingresado, forzando al usuario a reintentar y tener éxito únicamente en el segundo intento (código predeterminado `1234`).
3.  **Confirmación de Frase**: Validación estricta que requiere que el usuario marque una casilla de verificación de términos y escriba exactamente la palabra "ELIMINAR" en mayúsculas para desbloquear el botón de borrado definitivo.
4.  **Confirmación de Éxito**: Vista final de notificación de cierre de cuenta, enlazada a la desconexión del usuario.

### Notificaciones Locales Nativas (expo-notifications)
Se ha integrado el soporte nativo de notificaciones locales para interactuar activamente con el usuario y cumplir con los criterios de evaluación de capacidades nativas:
*   **Disparador de Preferencias**: Al activar cualquier interruptor en la pantalla de Configuración de Alertas, se lanza de inmediato una notificación nativa local de confirmación.
*   **Disparador de Optimización por IA**: Al finalizar la simulación del diagnóstico de cartera por Inteligencia Artificial en el panel de Servicios, se despacha una notificación nativa local que avisa que el reporte está listo.


## Guía de Instalación y Ejecución

Sigue estos pasos para desplegar el entorno de desarrollo local en cualquier simulador o dispositivo físico:

1.  **Instalación de Dependencias**:
    Abre la terminal en la carpeta raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

2.  **Despliegue del Servidor de Desarrollo**:
    Inicia Metro Bundler de Expo mediante el comando estándar:
    ```bash
    npx expo start
    ```

3.  **Visualización en Dispositivos**:
    *   **Dispositivo Físico**: Escanea el código QR que se muestra en la terminal usando la aplicación Expo Go (disponible en Google Play Store y Apple App Store).
    *   **Emulador de Android**: Presiona la tecla `a` en la terminal para desplegar la app en un emulador activo de Android.
    *   **Simulador de iOS**: Presiona la tecla `i` en la terminal para desplegar la app en un simulador activo de iOS.