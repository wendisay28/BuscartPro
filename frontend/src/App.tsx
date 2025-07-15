import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/AppLayout";

// Auth pages
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/dashboard/home";
import Explorer from "./pages/explorer";
import Profile from "./pages/user/UserProfile";
import { Favorites } from "./pages/user";
import CommunityBlog from "./pages/community/blog";
import RealTimeHiring from "./pages/hiring/realtime";
import CreateEvent from "./pages/events/create";
import NotFound from "./pages/not-found";

// Componente para rutas protegidas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Componente para envolver el contenido con el diseño de la aplicación
function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <>
        {children}
        <Toaster position="top-center" />
      </>
    </AppLayout>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas con diseño de aplicación */}
        <Route element={<ProtectedRoute><AppContent><Outlet /></AppContent></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="explorer" element={<Explorer />}>
            <Route index element={<Explorer />} />
            <Route path="artists" element={<Explorer />} />
            <Route path="events" element={<Explorer />} />
            <Route path="venues" element={<Explorer />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="user/profile" element={<Navigate to="/profile" replace />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="blog" element={<CommunityBlog />} />
          <Route path="hiring/realtime" element={<RealTimeHiring />} />
          <Route path="events/create" element={<CreateEvent />} />
        </Route>

        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
}
