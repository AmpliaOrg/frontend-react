import { Switch, Route } from "wouter";

import { queryClient } from "./lib/queryClient";
import VolunteerLayout from "@/components/layouts/VolunteerLayout";
import VolunteerDashboard from "@/pages/volunteer/Dashboard";
import VolunteerHistory from "@/pages/volunteer/History";
import VolunteerCertificates from "@/pages/volunteer/Certificates";
import Profile from "@/pages/volunteer/Profile";
import VolunteerOngsPage from "@/pages/volunteer/OngsPage";
import VolunteerOngDetail from "@/pages/volunteer/OngDetail";
import DonorLayout from "@/components/layouts/DonorLayout";
import DonorDashboard from "@/pages/donor/Dashboard";
import DonorProfile from "@/pages/donor/Profile";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import OngLayout from "@/components/layouts/OngLayout";
import VolunteersPage from "@/pages/ong/VolunteersPage";
import OngProfile from "@/pages/ong/Profile";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import LeadCapture from "@/pages/ong/LeadCapture";
import ContactUs from "@/pages/contact";
import VolunteerInterest from "@/pages/volunteer/Interest";
import CompanyInterest from "@/pages/company/Interest";
import { ProtectedRouteWrapper } from "@/lib/protected-route";
import { SecurityConstants } from "@/lib/security-constants";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/ong/interesse" component={LeadCapture} />
      <Route path="/fale-conosco" component={ContactUs} />
      <Route path="/voluntario/interesse" component={VolunteerInterest} />
      <Route path="/empresa/interesse" component={CompanyInterest} />
      
      {/* ONG Routes */}
      <Route path="/ong/dashboard">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_DASHBOARD_READ} allowedRoles={['ONG', 'ADMIN']}>
            <Dashboard />
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/ong/volunteers">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_WRITE} allowedRoles={['ONG', 'ADMIN']}>
            <OngLayout>
              <VolunteersPage />
            </OngLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/ong/profile">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_PROFILE_READ} allowedRoles={['ONG', 'ADMIN']}>
            <OngProfile />
        </ProtectedRouteWrapper>
      </Route>

      {/* Volunteer Routes */}
      <Route path="/volunteer/dashboard">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ} allowedRoles={['VOLUNTEER', 'ADMIN', 'USER']}>
            <VolunteerLayout>
              <VolunteerDashboard />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer/history">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ} allowedRoles={['VOLUNTEER', 'ADMIN', 'USER']}>
            <VolunteerLayout>
              <VolunteerHistory />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer/certificates">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ} allowedRoles={['VOLUNTEER', 'ADMIN', 'USER']}>
            <VolunteerLayout>
              <VolunteerCertificates />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer/profile">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ} allowedRoles={['VOLUNTEER', 'ADMIN', 'USER']}>
            <VolunteerLayout>
              <Profile />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer/ongs">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ} allowedRoles={['VOLUNTEER', 'ADMIN', 'USER']}>
            <VolunteerLayout>
              <VolunteerOngsPage />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/volunteer/ongs/:id">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_VOLUNTEER_READ} allowedRoles={['VOLUNTEER', 'ADMIN', 'USER']}>
            <VolunteerLayout>
              <VolunteerOngDetail />
            </VolunteerLayout>
        </ProtectedRouteWrapper>
      </Route>

      {/* Donor Routes */}
      <Route path="/donor/dashboard">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_DONATION_WRITE} allowedRoles={['USER', 'ADMIN']}>
            <DonorLayout>
              <DonorDashboard />
            </DonorLayout>
        </ProtectedRouteWrapper>
      </Route>
      <Route path="/donor/profile">
        <ProtectedRouteWrapper requiredPolicy={SecurityConstants.POLICY_PROFILE_READ} allowedRoles={['USER', 'ADMIN']}>
            <DonorLayout>
              <DonorProfile />
            </DonorLayout>
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
