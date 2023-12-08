import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./components/pages/Home";
import LoginPage from "./components/pages/Login";
import SignupPage from "./components/pages/Signup";
import AuthProvider from "./providers/Auth";
import { CookiesProvider } from 'react-cookie';
import PageRoutes from "./PageRoutes";

function App() {
  return (
    <Router>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <AuthProvider>
          <PageRoutes />
        </AuthProvider>
      </CookiesProvider>
    </Router>
  )
}

export default App
