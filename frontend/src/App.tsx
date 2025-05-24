import React from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

// Auth pages
import Landing from "./pages/auth/landing";
import Home from "./pages/dashboard/home";
import Explorer from "./pages/explorer";
import ExploreArtists from "./pages/explorer/artists";
import ExploreEvents from "./pages/explorer/events";
import ExploreVenues from "./pages/explorer/venues";
import Profile from "./pages/user/profile";
import Favorites from "./pages/user/favorites";
import CommunityBlog from "./pages/community/blog";
import RealTimeHiring from "./pages/hiring/realtime";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/dashboard" component={Home} />
          <Route path="/explorer" component={Explorer} />
          <Route path="/explorer/artists" component={ExploreArtists} />
          <Route path="/explorer/events" component={ExploreEvents} />
          <Route path="/explorer/venues" component={ExploreVenues} />
          <Route path="/profile" component={Profile} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/blog" component={CommunityBlog} />
          <Route path="/hiring" component={RealTimeHiring} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}