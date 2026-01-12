import { Switch, Route } from "wouter";

import { queryClient } from "./lib/queryClient";
import VolunteerLayout from "@/components/layouts/VolunteerLayout";
import VolunteerDashboard from "@/pages/volunteer/Dashboard";
import VolunteerHistory from "@/pages/volunteer/History";
import VolunteerCertificates from "@/pages/volunteer/Certificates";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />

      {/* Volunteer Routes */}
      <Route path="/volunteer-dashboard">
        <VolunteerLayout>
          <VolunteerDashboard />
        </VolunteerLayout>
      </Route>
      <Route path="/volunteer-history">
        <VolunteerLayout>
          <VolunteerHistory />
        </VolunteerLayout>
      </Route>
      <Route path="/volunteer-certificates">
        <VolunteerLayout>
          <VolunteerCertificates />
        </VolunteerLayout>
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
