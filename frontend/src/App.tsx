import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";


// Auth pages
import Landing from "./pages/auth/landing";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/dashboard/home";
import Explorer from "./pages/explorer";
import Profile from "./pages/user/profile";
import Favorites from "./pages/user/favorites";
import CommunityBlog from "./pages/community/blog";
import RealTimeHiring from "./pages/hiring/realtime";
import CreateEvent from "./pages/events/create";
import NotFound from "./pages/not-found";

// Componente para rutas protegidas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/explorer" element={
            <ProtectedRoute>
              <Explorer />
            </ProtectedRoute>
          } />
          <Route path="/explorer/artists" element={
            <ProtectedRoute>
              <Explorer initialTab="artists" />
            </ProtectedRoute>
          } />
          <Route path="/explorer/events" element={
            <ProtectedRoute>
              <Explorer initialTab="events" />
            </ProtectedRoute>
          } />
          <Route path="/explorer/venues" element={
            <ProtectedRoute>
              <Explorer initialTab="venues" />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/blog" element={<ProtectedRoute><CommunityBlog /></ProtectedRoute>} />
          <Route path="/hiring" element={<ProtectedRoute><RealTimeHiring /></ProtectedRoute>} />
          <Route path="/events/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />

    </TooltipProvider>
  );
}
