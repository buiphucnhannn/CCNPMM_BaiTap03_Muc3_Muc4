import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/auth/LoginPage';
import UserProfilePage from './pages/profile/UserProfilePage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import './App.css';

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_#f8fafc_55%)] px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-6 rounded-2xl border border-sky-100 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <h1 className="text-2xl font-bold text-slate-900">IT Forum</h1>
          <p className="mt-1 text-sm text-slate-600">{'\u0110\u0103ng nh\u1EADp h\u1EC7 th\u1ED1ng.'}</p>
        </header>
        {children}
      </div>
    </div>
  );
}

function RequireAuthRole({ role, children }) {
  const { isAuthenticated, user } = useSelector((state) => state.login);

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  const normalizedRole = (user.role || '').toLowerCase().trim();

  if (normalizedRole !== role) {
    const fallbackUrl = normalizedRole === 'admin' ? '/admin/profile' : '/user/profile';
    return <Navigate to={fallbackUrl} replace />;
  }

  return children;
}

function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/user/profile"
          element={
            <RequireAuthRole role="user">
              <UserProfilePage />
            </RequireAuthRole>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <RequireAuthRole role="admin">
              <AdminProfilePage />
            </RequireAuthRole>
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Shell>
  );
}

export default App;

