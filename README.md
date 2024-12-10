# Gas Detection Project

This project consists of a system for detecting toxic and harmful gases in a laboratory environment. It uses sensors connected to an ESP32 that send data to a web portal and a mobile application. The project is divided into three main parts:

## Project Structure

- **web**: Web application developed in React.js for visualizing and managing sensor data.
- **mobile**: Mobile application developed in React Native for monitoring sensor data from anywhere.
- **esp32**: Arduino code for configuring and reading the gas sensors connected to the ESP32.

## Technologies Used

- **Firebase**: For authentication and real-time data storage.
- **React.js**: For the web interface.
- **React Native**: For the mobile application.
- **Arduino**: For ESP32 configuration and sensor reading.

## Installation and Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/AlexGR10/SafeLab.git
    ```
2. **Navigate to the project directory**:
    ```sh
    cd SafeLab
    ```

3. **Web Setup**:
    ```sh
    cd web
    npm install
    npm start
    ```

4. **Mobile Setup**:
    ```sh
    cd mobile
    npm install
    npx react-native run-android  # or run-ios
    ```

5. **ESP32 Setup**:
    - Upload the code from the `esp32` directory to the ESP32 using the Arduino IDE.

## License

This repository is protected by copyright. For more details, see the `LICENSE.md` file.

