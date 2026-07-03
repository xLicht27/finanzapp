# FinanzApp Mobile

FinanzApp es una aplicación móvil premium de finanzas personales desarrollada sobre React Native y Expo. La aplicación está optimizada exclusivamente para dispositivos iOS, ofreciendo una experiencia premium con soporte reactivo de temas (Claro, Oscuro y Alto Contraste), diseño modular de estilos en el frontend y un flujo guiado de eliminación de cuenta de 5 pasos.

## Arquitectura del Proyecto y Estilos Modulares

El proyecto sigue una estructura limpia y modular de carpetas, organizando los estilos en una carpeta dedicada (`src/styles/`) para separar el diseño global del específico de cada componente o pantalla:

```
finanzapp-mobile/
├── assets/             # Recursos multimedia e iconos
├── src/
│   ├── components/     # Componentes visuales reutilizables de la interfaz
│   ├── constants/      # Constantes de configuración de la app
│   ├── context/        # Contextos globales de estado (Autenticación y Temas)
│   ├── hooks/          # Hooks personalizados de lógica de negocio
│   ├── navigation/     # Definición de flujos y rutas de navegación
│   ├── screens/        # Vistas principales de la aplicación
│   └── styles/         # Módulo centralizado y modular de estilos:
│       ├── globales.js    # Paletas de color reactivas y estilos comunes de pantalla
│       ├── componentes.js # Estilos exclusivos para los componentes de src/components/
│       └── pantallas.js   # Estilos exclusivos para las vistas de src/screens/
├── App.js              # Inicializador raíz del árbol de componentes
├── app.json            # Configuración de compilación de Expo
├── index.js            # Punto de entrada de la aplicación
└── package.json        # Dependencias y scripts de npm
```

### Organización de los Archivos de Estilos

1. **`src/styles/globales.js`**: Define las paletas de color y estilos comunes de la aplicación (contenedores de pantalla, scrolls, SafeAreas y cabeceras).
2. **`src/styles/componentes.js`**: Contiene exclusivamente las hojas de estilo de los componentes de interfaz de usuario de `src/components/`, incluyendo notas descriptivas antes de cada declaración.
3. **`src/styles/pantallas.js`**: Contiene las hojas de estilo mapeadas específicamente para cada pantalla en `src/screens/`, incluyendo notas descriptivas antes de cada declaración.

## Dependencias Principales

La aplicación utiliza la versión SDK estable de Expo y las siguientes librerías core:
- **Expo (v54.0.33)**: Framework de desarrollo React Native multiplataforma.
- **React Navigation**: Gestión de pila nativa y pestañas inferiores de navegación:
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **React Native Gesture Handler & Screens**: Control y renderizado optimizado de transiciones y gestos nativos de iOS.
- **Expo Vector Icons**: Conjunto de iconos vectoriales integrados (Ionicons).
- **AsyncStorage**: Persistencia en el dispositivo local para el inicio de sesión y preferencias de accesibilidad/temas.

## Guía de Instalación y Ejecución

Para iniciar el proyecto en un entorno de desarrollo para el simulador de iOS, sigue los siguientes pasos:

1. **Instalar las dependencias del proyecto**:
   Ejecuta el instalador de paquetes npm en la terminal dentro de la carpeta raíz:
   ```bash
   npm install
   ```

2. **Iniciar el simulador de iOS**:
   Para iniciar Metro Bundler y levantar de forma automatizada la simulación del dispositivo iPhone de Apple:
   ```bash
   npx expo start --ios
   ```

Alternativamente, puedes ejecutar el comando estándar de inicio:
```bash
npm run start
```
Y presionar la tecla `i` en la terminal una vez que Metro esté ejecutándose para abrir la aplicación directamente en Xcode Simulator.