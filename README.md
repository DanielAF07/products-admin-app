# ProductsAdminApp 🛍️

Welcome to ProductsAdminApp! This project is a robust e-commerce management solution developed with [React Native](https://reactnative.dev/) and [Expo SDK 52 (Beta)](https://expo.dev/) that provides comprehensive product management capabilities for your online store.

## About the Project

ProductsAdminApp is designed to streamline the management of e-commerce products with a user-friendly interface. The app includes secure authentication and comprehensive product management features, making it an essential tool for e-commerce administrators.

### Key Features

- 🔐 Secure login system to protect your data
- 📱 Intuitive product management interface
- 📸 Image upload capabilities for product photos
- ✏️ Full product information editing
- 📊 Product inventory management
- 🎨 User-friendly design
- 📱 Responsive layout for various screen sizes

## Running the App

To get started with ProductsAdminApp:

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure your environment variables:
   ```bash
   cp .env.template .env
   ```
   Fill in your configuration details in the `.env` file

3. Start the development server:
   ```bash
   npx expo start
   ```

> **Note:** Make sure you have the necessary permissions and API keys configured in your environment variables for image upload functionality.

## Authentication

The app implements a secure authentication system:
- Login page with email and password validation
- Secure session management
- Automatic session timeout

## Product Management

Administrators can:
- Create new products with detailed information
- Upload and manage product images
- Edit existing product details
- Manage product inventory
- Delete products from the catalog

## Learn More

To learn more about the technologies used in this project:
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Axios](https://axios-http.com/) for API requests
- [Formik](https://formik.org/) for form handling

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.