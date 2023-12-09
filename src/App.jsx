import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from "./providers/Auth";
import { CookiesProvider } from 'react-cookie';
import PageRoutes from "./PageRoutes";
import QueryProvider from "./providers/QueryProvider";

function App() {
  return (
    <Router>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <AuthProvider>
          <QueryProvider>
            <PageRoutes />
          </QueryProvider>
        </AuthProvider>
        <ToastContainer position="bottom-right" />
      </CookiesProvider>
    </Router>
  )
}

export default App
