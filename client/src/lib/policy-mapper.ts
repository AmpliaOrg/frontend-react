import { SecurityConstants } from "./security-constants";

export function getPoliciesForRole(role: string): string[] {
  const policies: string[] = [];
  
  // Always include the role itself as a pseudo-policy if needed, but not strictly required by the design
  
  switch (role) {
    case 'ADMIN':
      return Object.values(SecurityConstants); // Admin gets everything
      
    case 'ONG':
      return [
        SecurityConstants.POLICY_VOLUNTEER_READ,
        SecurityConstants.POLICY_VOLUNTEER_WRITE,
        SecurityConstants.POLICY_PROJECT_READ,
        SecurityConstants.POLICY_PROJECT_WRITE,
        SecurityConstants.POLICY_DONATION_READ,
        SecurityConstants.POLICY_DONATION_WRITE,
        SecurityConstants.POLICY_DASHBOARD_READ,
        SecurityConstants.POLICY_PROFILE_READ,
      ];
      
    case 'VOLUNTEER':
      return [
        SecurityConstants.POLICY_PROJECT_READ,
        SecurityConstants.POLICY_PROFILE_READ,
        SecurityConstants.POLICY_PROFILE_WRITE,
        SecurityConstants.POLICY_VOLUNTEER_READ, // Allow volunteer to access their own dashboard area
      ];
      
    case 'COMPANY':
    case 'USER':
      return [
        SecurityConstants.POLICY_PROJECT_READ,
        SecurityConstants.POLICY_DONATION_WRITE,
      ];
      
    default:
      return [];
  }
}
