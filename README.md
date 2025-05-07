# Password Expo Go Application

This project is my graded final project for the course Mobile Programming.
The application is built using React Native and Expo. It uses Firebase for database and user management. Registered users can generate and store strong passwords using the app.

The application was originally developed with iOS devices in mind.
However, after Expo Go updated to SDK version 53, compatibility issues arose with Firebase Authentication. Since Apple restricts app downloads to the latest version only, reverting to an earlier working version is not possible.
Due to these limitations, the application can currently be used on Android devices, the Android Emulator, and the Apple Simulator.
For more information, see the [How to Get Started](#how-to-get-started) section.

## Technologies

- **React Native**: JavaScript library for building user interfaces.
- **Expo**: An open source platform that helps creating, deploying, and updating native apps with React.
- **React Native Paper**: React Native Paper is a cross-platform UI kit for Android and iOS.

### Data Management:
- **Firebase Realtime Database**: Used for storing and managing data.
- **React Native AsyncStorage**: Used to store user's authentication status (login state)locally on the device, allowing the app to keep the user logged in between app launches.

### Authentication:
- **Expo LocalAuthentication**: Used for biometric user authentication.
- **Firebase Authentication**: Used for user management.

### Encryption:
- **Expo Crypto**: Used for generating a unique salt value for each user.
- **CryptoJS**: Used for encrypting generated passwords.

### Testing:
- **Expo Go**: Used for running the mobile app on device and testing manually.

## How to Get Started
Download Expo Go SDK version 52 from https://expo.dev/go on device.

NOTE: Further instructions are in progress...
