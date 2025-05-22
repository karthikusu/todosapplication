import React from 'react';
import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginPage from './pages/login/page';
import WelcomeComponent from './components/welcome/welcome';
import { ToastContainer } from 'react-toastify';
import TodosListPage from './pages/todos/page';
import TodoAddEditPage from './pages/todos/[id]/page';
import WelcomePage from './pages/welcome/page';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';


const App = () => {
  return (
    <>
    <Navigation />
    <Container className="my-5">
      <Routes>
 <Route path="/" element={<LoginPage />} />
 <Route path="/login" element={<LoginPage />} />
 <Route
 path="/welcome/:username"
 element={
 <AuthenticatedRoute>
 <WelcomePage />
 </AuthenticatedRoute>
 }
 />
 <Route
 path="/todos"
 element={
 <AuthenticatedRoute>
 <TodosListPage />
 </AuthenticatedRoute>
 }
 />
 <Route
 path="/todos/:id"
 element={
 <AuthenticatedRoute>
 <TodoAddEditPage />
 </AuthenticatedRoute>
 }
 />
 </Routes>
    </Container>
    <ToastContainer />
    </>
  );
}
export default App;