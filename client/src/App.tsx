import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

// Auth pages
import Landing from "@/pages/auth/landing";

// Dashboard pages
import Home from "@/pages/dashboard/home";

// Explorer pages
import Explorer from "@/pages/explorer";
import ExploreArtists from "@/pages/explorer/artists";
import ExploreEvents from "@/pages/explorer/events";
import ExploreVenues from "@/pages/explorer/venues";

// User pages
import Profile from "@/pages/user/profile";
import Favorites from "@/pages/user/favorites";

// Community pages
import CommunityBlog from "@/pages/community/blog";

// Hiring pages
import RealTimeHiring from "@/pages/hiring/realtime";

// Utility pages
import NotFound from "@/pages/not-found";

// Configuración de rutas
const routes = {
  public: [
    { path: '/', component: Landing }
  ],
  private: [
    { path: '/', component: Home },
    { path: '/explorer', component: Explorer },
    { path: '/explorer/artists', component: ExploreArtists },
    { path: '/explorer/events', component: ExploreEvents },
    { path: '/explorer/venues', component: ExploreVenues },
    { path: '/user/profile', component: Profile },
    { path: '/user/favorites', component: Favorites },
    { path: '/community/blog', component: CommunityBlog },
    { path: '/hiring/realtime', component: RealTimeHiring }
  ]
};

/**
 * Componente Router principal
 */
function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        // Rutas públicas
        routes.public.map(({ path, component: Component }) => (
          <Route key={path} path={path} component={Component} />
        ))
      ) : (
        // Rutas privadas
        <>
          {routes.private.map(({ path, component: Component }) => (
            <Route key={path} path={path} component={Component} />
          ))}
          
          {/* Explorer routes */}
          <Route path="/explorer" component={Explorer} />
          <Route path="/explorer/artists" component={ExploreArtists} />
          <Route path="/explorer/events" component={ExploreEvents} />
          <Route path="/explorer/venues" component={ExploreVenues} />
          
          {/* User routes */}
          <Route path="/user/profile" component={Profile} />
          <Route path="/user/favorites" component={Favorites} />
          
          {/* Community routes */}
          <Route path="/community/blog" component={CommunityBlog} />
          
          {/* Hiring routes */}
          <Route path="/hiring/realtime" component={RealTimeHiring} />
          
          {/* Legacy routes for compatibility */}
          <Route path="/profile" component={Profile} />
          <Route path="/favorites" component={Favorites} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
