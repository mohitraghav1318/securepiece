import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import AppHeader from '../shared/components/layout/AppHeader';
import GuidingScene from '../shared/components/three/GuidingScene';
import { APP_ROUTES } from '../shared/config/routes';
import ProtectedRoute from '../shared/components/routing/ProtectedRoute';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen flex flex-col font-sans text-stable-900 bg-stable-50 overflow-hidden">
        {/* Render GuidingScene globally, placed beneath everything (z-0) */}
        <GuidingScene />

        {/* High z-index (z-50) ensures Header sits firmly above 3D scene and page content */}
        <div className="relative z-50">
          <AppHeader />
        </div>

        {/* lower z-index for the main content layer */}
        <div className="relative z-10 flex-1 w-full flex flex-col">
          <Routes>
            <Route path={APP_ROUTES.home} element={<HomePage />} />
            <Route path={APP_ROUTES.login} element={<LoginPage />} />
            <Route path={APP_ROUTES.register} element={<RegisterPage />} />
            <Route
              path={APP_ROUTES.dashboard}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate replace to={APP_ROUTES.home} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
