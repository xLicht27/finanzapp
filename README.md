# FinanzApp Mobile

FinanzApp is a premium React Native mobile application built on top of Expo, designed specifically for iOS devices to help users manage their personal finances, track daily transactions, monitor savings goals, and adjust settings with advanced accessibility options.

## Project Structure

The project follows a standard and modular React Native folder structure:

```
finanzapp-mobile/
├── assets/             # Media and icon assets
├── src/
│   ├── components/     # Reusable UI components (MetaAhorroCard, TransaccionItem, etc.)
│   ├── constants/      # App-wide configuration values and theme declarations (theme.js)
│   ├── context/        # React Context Providers for global state management (AuthContext, TemaContext)
│   ├── hooks/          # Custom hooks (useTipoCambio)
│   ├── navigation/     # App navigation flows and navigators (AppNavigator, AuthNavigator)
│   └── screens/        # Main application screens (HomeScreen, ReportesScreen, AjustesScreen, etc.)
├── App.js              # Application entry point wrapping global providers
├── app.json            # Expo configuration file
├── index.js            # Main entry point file for registry
└── package.json        # Dependencies and scripts definitions
```

## Key Dependencies

- **Expo (v54.0.33)**: Core platform for React Native development.
- **React Navigation**: Native stack and bottom tab navigation:
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **React Native Gesture Handler & Screens**: Performance-optimized native gestures and screen transitions.
- **AsyncStorage**: Persistent storage of user configurations (theme, accessibility, auth session).

## Setup and Running on iOS Simulator

To run the application in the iOS simulator, execute the following commands in the project directory:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Expo development server and boot the iOS simulator:
   ```bash
   npx expo start --ios
   ```

Alternatively, you can start Metro by running:
```bash
npm run start
```
And then press `i` in the terminal to open the project in the iOS Simulator.