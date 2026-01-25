import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Redirect, Route, RouteProps } from "wouter";

import { getPoliciesForRole } from "./policy-mapper";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  allowedRoles?: string[];
  requiredPolicy?: string;
}

export function ProtectedRoute({ component: Component, allowedRoles, requiredPolicy, ...rest }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  return (
    <Route {...rest}>
      {(params) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }

        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        // Check Roles (Legacy/Simple)
        if (allowedRoles && user && !allowedRoles.includes(user.role)) {
          return <Redirect to="/" />;
        }

        // Check Policy (New RBAC)
        if (requiredPolicy && user) {
            const userPolicies = getPoliciesForRole(user.role);
            if (!userPolicies.includes(requiredPolicy)) {
                return <Redirect to="/" />;
            }
        }

        return <Component {...params} />;

        return <Component {...params} />;
      }}
    </Route>
  );
}

// Wrapper for layouts that need protection but aren't direct Routes (like the nested defined routes in App.tsx)
export function ProtectedRouteWrapper({ children, allowedRoles, requiredPolicy }: { children: React.ReactNode, allowedRoles?: string[], requiredPolicy?: string }) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const [shouldRedirectLogin, setShouldRedirectLogin] = React.useState(false);
    const [shouldRedirectHome, setShouldRedirectHome] = React.useState(false);

    // Use effect to handle redirects to avoid "Cannot update during state transition"
    React.useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                setShouldRedirectLogin(true);
            } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
                setShouldRedirectHome(true);
            } else if (requiredPolicy && user) {
                const userPolicies = getPoliciesForRole(user.role);
                if (!userPolicies.includes(requiredPolicy)) {
                    setShouldRedirectHome(true);
                }
            }
        }
    }, [isLoading, isAuthenticated, user, allowedRoles]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (shouldRedirectLogin) return <Redirect to="/login" />;
    if (shouldRedirectHome) return <Redirect to="/" />;

    return <>{children}</>;
}

import React from "react";
