import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../login/LoginPage';
import SignupPage from '../../signup/SignupPage';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default PublicRoutes