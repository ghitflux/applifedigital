module.exports = {
  expo: {
    name: "App Life Digital",
    slug: "applifedigital",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#1A1A2E"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.applifedigital.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#1A1A2E"
      },
      package: "com.applifedigital.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    scheme: "applifedigital",
    experiments: {
      typedRoutes: true
    },
    extra: {
      // API URL will be auto-detected from Expo debugger host in development
      // Set API_URL env var to override for production
      // Default fallback for Android Emulator: 10.0.2.2
      apiUrl: process.env.API_URL || "http://10.0.2.2:8000",
    }
  }
};
