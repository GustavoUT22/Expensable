import styled from "@emotion/styled";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupForm from "./components/Login/sign-up";
import { colors } from "./styles";
import Sidebar from "./components/Sidebar";
import CategoriesPage from "./pages/categories-page";
import Login from "./components/Login";
import { tokenKey } from "./config";
import Layout from "./components/Layout/layout";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem(tokenKey);
  if (!token) {
    return <Navigate to="/Login" replace={true} />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="categories"
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route path="categories/:type" element={<CategoriesPage />} />
      <Route
        path="transactions"
        element={
          <ProtectedRoute>
            <Layout>
              <h1>Transactions</h1>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="budgets"
        element={
          <ProtectedRoute>
            <Layout>
              <h1>Budgets</h1>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="sign-up" element={<SignupForm />} />
      <Route path="*" element={<>Page Not Found</>} />
    </Routes>
  );
}

export default App;
