export const SecurityConstants = {
  // Volunteering Policies
  POLICY_VOLUNTEER_READ: "VOLUNTEER_READ",
  POLICY_VOLUNTEER_WRITE: "VOLUNTEER_WRITE",
  
  // Project Policies
  POLICY_PROJECT_READ: "PROJECT_READ",
  POLICY_PROJECT_WRITE: "PROJECT_WRITE",
  
  // Donation Policies
  POLICY_DONATION_READ: "DONATION_READ",
  POLICY_DONATION_WRITE: "DONATION_WRITE",
  
  // User Profile Policies
  POLICY_PROFILE_READ: "PROFILE_READ",
  POLICY_PROFILE_WRITE: "PROFILE_WRITE",
  
  // Dashboard Policies
  POLICY_DASHBOARD_READ: "DASHBOARD_READ",

  // General Administration
  POLICY_ADMIN_ACCESS: "ADMIN_ACCESS"
} as const;

export type Policy = typeof SecurityConstants[keyof typeof SecurityConstants];
