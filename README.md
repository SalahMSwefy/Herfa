# Herfa

Herfa is a platform that connects customers with skilled workers for repair and maintenance services. It allows users to search for suitable workers based on their needs and location. Customers can create accounts to place service requests, while workers have dashboards to manage their tasks and clients. The platform aims to streamline the process of finding reliable professionals for various repair jobs. This repository contains the front-end code for Herfa, built using **React** and **Vite**.

## 🚀 Features

-   User authentication (Login & Sign up & Forget Password & Reset Password)
-   Dashboard for workers to manage their customers' orders and see the reviews
-   Dashboard for customers to Search functionality to find suitable workers and make review after finish the order
-   Responsive design for a seamless user experience

## 🛠️ Technologies Used

-   **React.js** - Front-end framework
-   **Vite** - Fast build tool for React
-   **Tailwind CSS** - For stylings
-   **Fetch API** - For API requests
-   **React Router** - For navigation

## 📂 Project Structure

```
7erfa/
├── public/
│   ├── categories/
│   ├── logos/
│   ├── services-icons/
│   └── team/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Customer/
│   │   ├── LandingPage/
│   │   └── Worker/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── ui/
```

## 🏗️ Installation & Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/SalahMSwefy/7erfa.git
    ```
2. Navigate to the project directory:
    ```sh
    cd 7erfa
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file from `.env.example` and set up the required environment variables.
5. Start the development server:
    ```sh
    npm run dev
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

-   `VITE_SECRET_KEY`
-   `VITE_API_URL`

## 🔗 API Integration

7erfa Frontend interacts with the backend via RESTful APIs. Ensure the backend is running and update API base URLs in the `.env` file.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📜 License

This project is licensed under the **MIT License**.

---

## Authors

-   [@Salah Swefy](https://github.com/SalahMSwefy)
-   [@Youssef Megahed](https://github.com/Bor3y9)
-   [@Mohamed Khalil](https://github.com/Bigkhil)
-   [@Saad Samir](https://github.com/SaadSamir7)
