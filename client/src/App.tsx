import { Switch, Route } from "wouter";

import { queryClient } from "./lib/queryClient";
import VolunteerLayout from "@/components/layouts/VolunteerLayout";
import VolunteerDashboard from "@/pages/volunteer/Dashboard";
import VolunteerHistory from "@/pages/volunteer/History";
import VolunteerCertificates from "@/pages/volunteer/Certificates";
import Profile from "@/pages/volunteer/Profile";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import OngLayout from "@/components/layouts/OngLayout";
import VolunteersPage from "@/pages/ong/VolunteersPage";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { ProtectedRouteWrapper } from "@/lib/protected-route";
import { SecurityConstants } from "@/lib/security-constants";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />

      {/* Volunteer Routes */}
      <Route path="/volunteer-dashboard">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ}>
            <VolunteerLayout>
              <VolunteerDashboard />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer-history">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ}>
            <VolunteerLayout>
              <VolunteerHistory />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer-certificates">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ}>
            <VolunteerLayout>
              <VolunteerCertificates />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer-profile">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ}>
            <VolunteerLayout>
              <Profile />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>

      {/* ONG Routes */}
      <Route path="/ong/volunteers">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_WRITE}>
            <OngLayout>
              <VolunteersPage />
            </OngLayout>
        </ProtectedRouteWrapper>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
