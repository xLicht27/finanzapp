# FinanZaap Mobile

FinanZaap es una aplicación móvil multiplataforma diseñada para el control financiero personal, la categorización inteligente de gastos y la planificación de metas de ahorro. Desarrollada sobre React Native y Expo, la aplicación ofrece una experiencia fluida con soporte global de temas reactivos, alta accesibilidad, capacidades nativas robustas y una arquitectura estructurada, segura y escalable.

---

## Estructura del Proyecto

El código fuente de la aplicación se organiza dentro del directorio raíz src/, distribuyendo las responsabilidades en la siguiente jerarquía de carpetas:

```
finanzapp-mobile/
├── assets/                                 # Recursos visuales estáticos e imágenes del proyecto
│   └── logo.png                            # Logotipo principal de FinanZaap
├── src/                                    # Directorio contenedor del código fuente
│   ├── components/                         # Componentes visuales interactivos y reutilizables
│   │   ├── CategoriaBar.js                 # Barra de porcentaje de gastos por categorías
│   │   ├── CustomButton.js                 # Botón táctil estilizado con spinner de carga
│   │   ├── MetaAhorroCard.js               # Tarjeta con progreso para metas de ahorro
│   │   ├── PresupuestoBadge.js             # Recuadro con presupuesto restante y estado diario
│   │   └── TransaccionItem.js              # Renglón con ícono dinámico para transacciones
│   ├── context/                            # Proveedores de estado y contextos globales
│   │   ├── AuthContext.js                  # Maneja la sesión y el estado de la biometría
│   │   └── TemaContext.js                  # Administra temas (Claro, Oscuro, Alto Contraste) e idiomas
│   ├── hooks/                              # Ganchos o hooks personalizados de lógica reactiva
│   │   └── useTipoCambio.js                # Custom hook para el consumo de tipo de cambio
│   ├── navigation/                         # Configuración y enrutadores de los flujos de navegación
│   │   ├── AppNavigator.js                 # Flujo principal de pestañas inferiores y ajustes
│   │   ├── AuthNavigator.js                # Flujo de autenticación (Login y Registro)
│   │   └── RootNavigator.js                # Enrutador raíz con control de bloqueo biométrico
│   ├── screens/                            # Pantallas o interfaces completas de la aplicación
│   │   ├── AjustesAccesibilidadScreen.js   # Preferencias de tema, alto contraste y tamaño de texto
│   │   ├── AjustesEliminarCuentaScreen.js  # Flujo guiado de 5 pasos para eliminar la cuenta
│   │   ├── AjustesNotificacionesScreen.js  # Configuración de alertas y avisos del sistema
│   │   ├── AjustesPrivacidadScreen.js      # Control de IA e interruptor de biometría nativa
│   │   ├── AjustesScreen.js                 # Menú general con accesos al perfil y configuraciones
│   │   ├── HomeScreen.js                   # Tablero de inicio con presupuesto y transacciones
│   │   ├── LoginScreen.js                  # Formulario de acceso con biometría
│   │   ├── ProfileScreen.js                # Detalla el perfil del usuario activo y cierre de sesión
│   │   ├── RegisterScreen.js               # Formulario de registro en 3 etapas
│   │   ├── ReportesScreen.js               # Gráficos y resúmenes estadísticos de gastos
│   │   └── ServiciosScreen.js               # Metas deslizables (Swipe), IA y cámara nativa
│   ├── services/                           # Módulo desacoplado para consumo de servicios
│   │   ├── pdfServicio.js                  # Servicio de compilación y exportación de PDFs
│   │   └── tipoCambioServicio.js           # Servicio de consumo de API REST con caché offline
│   └── styles/                             # Hojas de estilo modulares independientes de la lógica
│       ├── AjustesAccesibilidadScreenEstilos.js
│       ├── AjustesEliminarCuentaScreenEstilos.js
│       ├── AjustesNotificacionesScreenEstilos.js
│       ├── AjustesPrivacidadScreenEstilos.js
│       ├── AjustesScreenEstilos.js
│       ├── HomeScreenEstilos.js
│       ├── LoginScreenEstilos.js
│       ├── ProfileScreenEstilos.js
│       ├── RegisterScreenEstilos.js
│       ├── ReportesScreenEstilos.js
│       ├── ServiciosScreenEstilos.js
│       ├── componentes.js                  # Reglas de estilo para widgets de src/components
│       └── globales.js                     # Paleta de colores para los 4 temas y bases comunes
├── App.js                                  # Punto de entrada raíz de React Native
├── app.json                                # Archivo de manifiesto de Expo para compilar
├── eas.json                                # Archivo que define perfiles para EAS Build
├── index.js                                # Registro en el hilo principal
└── package.json                            # Dependencias y scripts de ejecución
```

---

## Análisis de la Arquitectura

FinanZaap Mobile se rige bajo una arquitectura limpia y desacoplada de responsabilidades:
*   Presentación Aislada (screens/ y components/): Las pantallas estructuran el diseño, consumiendo componentes visuales reutilizables. No manejan estilos inline de gran volumen.
*   Separación de Estilos (styles/): Toda la visualización estética se extrae a hojas de estilo modulares que reciben la paleta de colores reactiva actual según el modo seleccionado (Claro, Oscuro, Alto Contraste).
*   Lógica de Negocio Centralizada (context/ y hooks/): Se administra el estado global como las credenciales del usuario, el idioma y el tema de manera centralizada.
*   Servicios Desacoplados (services/): Módulo independiente que encapsula llamadas externas de red a APIs REST e interactúa con el hardware, aislando la lógica técnica de fetch y renderizado nativo de los hooks reactivos y componentes de pantalla.

---

## Integración de API REST (Offline-First)

Para asegurar el cumplimiento de la rúbrica y garantizar que la aplicación funcione de manera estable en la exposición (donde puede haber baja señal), el consumo de la API de divisas (exchangerate-api.com) cuenta con una arquitectura de caché offline-first:

1.  Llamada Segura: La app intenta consumir la API REST del tipo de cambio actual.
2.  Caché en Almacenamiento Local: Si la llamada es exitosa, guarda de inmediato la tasa PEN en AsyncStorage.
3.  Fallback sin Bloqueos: Si ocurre un fallo de red o se expone sin internet, el servicio captura la excepción de forma asíncrona y extrae de inmediato la última tasa guardada en la caché local.
4.  Respaldo por Defecto: Si no hay datos previos en caché, aplica un valor de respaldo (3.75) garantizando la estabilidad absoluta de la interfaz.

---

## Funcionalidades Nativas Implementadas (Expo APIs)

La aplicación utiliza las siguientes capacidades de hardware nativo de manera fluida y con control de permisos:

### 1. Autenticación Biométrica (expo-local-authentication)
*   Manejo de Permisos: Verifica si el dispositivo cuenta con sensores biométricos y si existen registros activos en el sistema operativo.
*   Seguridad Activa: Permite habilitar/deshabilitar el acceso biométrico desde Ajustes de Privacidad. Al estar activo, la aplicación bloquea el acceso en RootNavigator y solicita la huella o rostro del usuario al iniciar la app.

### 2. Escáner con Cámara Nativa (expo-camera)
*   Solicitud de Acceso: Solicita accesos de cámara en español. Si el usuario deniega, explica de forma amigable cómo habilitarlos.
*   Captura y Previsualización: Abre CameraView para capturar la imagen. Al tomar la foto del comprobante, muestra una miniatura (preview) elegante del recibo en pantalla con opciones de Confirmar o Descartar.

### 3. Notificaciones Locales (expo-notifications)
*   Acciones Desencadenantes: Despacha alertas del sistema de manera asíncrona ante acciones críticas:
    *   Al guardar los cambios de alertas en Configuración de Notificaciones.
    *   Al completar el diagnóstico de cartera por Inteligencia Artificial.
    *   Al confirmar la previsualización del recibo escaneado por cámara.

### 4. Generación e Impresión de Documentos (expo-print) y Compartido Nativo (expo-sharing)
*   Exportación PDF: Genera un documento PDF estructurado en tiempo real conteniendo el reporte de transacciones y de metas de ahorro activas del usuario, aplicando los colores y estilos del tema seleccionado.
*   Compartido del Sistema: Abre el menú nativo del dispositivo (iOS y Android) para enviar el reporte PDF a través de WhatsApp, correo, o guardarlo directamente en el almacenamiento interno.

---

## Módulo de Conversor de Divisas

Se ha integrado en la pantalla de Servicios un módulo conversor de divisas interactivo que consume en tiempo real la tasa del tipo de cambio oficial de la aplicación:
*   Doble Vinculación Reactiva: Escribir un monto en dólares (USD) calcula instantáneamente su conversión a soles (PEN), y escribir en soles calcula su valor equivalente en dólares.
*   Diseño Responsivo: Se integra estéticamente bajo la misma guía de diseño de tarjetas del sistema financiero oscuro de la aplicación.
*   Funcionamiento sin Conexión: Al consumir la tasa gestionada por useTipoCambio, el conversor mantiene la operatividad plena offline utilizando la caché local en AsyncStorage.

---

## Configuración del Entorno de Publicación (EAS Build)

La aplicación está completamente preparada para compilarse nativamente para Android (APK/AAB) e iOS (IPA) mediante los estándares oficiales de la industria:
*   app.json: Contiene las especificaciones nativas completas, incluyendo el identificador de paquete para Android (android.package: "com.finanzaap.app") y el bundle identifier para iOS (ios.bundleIdentifier: "com.finanzaap.app"), así como la llave NSFaceIDUsageDescription para autorizar FaceID.
*   eas.json: Archivo que define las reglas y perfiles de compilación para la consola de EAS (Expo Application Services) para generar compilaciones de desarrollo (development), pruebas internas (preview) y producción final (production).

---

## Guía de Instalación y Ejecución

Sigue estos pasos para desplegar el entorno de desarrollo local en cualquier simulador o dispositivo físico:

1.  Instalación de Dependencias:
    Abre la terminal en la carpeta raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

2.  Despliegue del Servidor de Desarrollo:
    Inicia Metro Bundler de Expo mediante el comando estándar:
    ```bash
    npx expo start
    ```

3.  Visualización en Dispositivos:
    *   Dispositivo Físico: Escanea el código QR que se muestra en la terminal usando la aplicación Expo Go (disponible en Google Play Store y Apple App Store).
    *   Emulador de Android: Presiona la tecla a en la terminal para desplegar la app en un emulador activo de Android.
    *   Simulador de iOS: Presiona la tecla i en la terminal para desplegar la app en un simulador activo de iOS.