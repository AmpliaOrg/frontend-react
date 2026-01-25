// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'ONG' | 'COMPANY' | 'VOLUNTEER';
  organizationName?: string;
  cnpj?: string;
  companyName?: string;
  companyCnpj?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  role: string;
  token: string;
  message?: string;
  firstName?: string;
  lastName?: string;
}


export interface DonationDTO {
  guid?: string;
  amount: number;
  donorName: string;
  donorType: 'INDIVIDUAL' | 'CORPORATE';
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  donationDate?: string;
  groupId: number;
  projectGuid?: string;
  notes?: string;
}

export interface VolunteerDTO {
  guid?: string;
  name: string;
  email: string;
  role?: string;
  hoursContributed?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  groupId: number;
  avatarUrl?: string;
}

export interface ProjectDTO {
  guid?: string;
  name: string;
  description?: string;
  goalAmount: number;
  currentAmount?: number;
  status?: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  startDate?: string;
  endDate?: string;
  groupId: number;
  progressPercentage?: number;
}

export interface DashboardStats {
  totalRaised: number;
  monthlyGrowthPercentage: number;
  activeVolunteers: number;
  newVolunteersThisWeek: number;
  projectGoalPercentage: number;
  totalHoursDonated: number;
  totalDonations: number;
  activeProjects: number;
}

export interface UserProfileDTO {
  guid?: string;
  userGuid: string;
  bio?: string;
  age?: number;
  location?: string;
  skills?: string;
  hobbies?: string;
  interests?: string;
  tags?: string[];
  avatarUrl?: string;
  socialLinks?: string;
  firstName?: string;
  lastName?: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// API Client
class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const json = await response.json();
    
    // Check if it's our new ApiResponse format
    if (json && typeof json === 'object' && 'code' in json && 'success' in json && 'model' in json) {
        if (!json.success) {
            throw new Error(json.errorMessage || 'Request failed');
        }
        return json.model;
    }

    return json;
  }

  // Auth
  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Donations
  async createDonation(data: DonationDTO): Promise<DonationDTO> {
    return this.request<DonationDTO>('/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDonationsByGroup(groupId: number, page = 0, size = 10) {
    return this.request(`/donations/group/${groupId}?page=${page}&size=${size}`);
  }

  async getTotalDonations(groupId: number): Promise<number> {
    return this.request<number>(`/donations/group/${groupId}/total`);
  }

  // Volunteers
  async createVolunteer(data: VolunteerDTO): Promise<VolunteerDTO> {
    return this.request<VolunteerDTO>('/volunteers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getVolunteersByGroup(groupId: number, page = 0, size = 10) {
    return this.request(`/volunteers/group/${groupId}?page=${page}&size=${size}`);
  }

  async addVolunteerHours(guid: string, hours: number): Promise<VolunteerDTO> {
    return this.request<VolunteerDTO>(`/volunteers/${guid}/hours?hours=${hours}`, {
      method: 'PATCH',
    });
  }

  // Projects
  async createProject(data: ProjectDTO): Promise<ProjectDTO> {
    return this.request<ProjectDTO>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProjectsByGroup(groupId: number, page = 0, size = 10) {
    return this.request(`/projects/group/${groupId}?page=${page}&size=${size}`);
  }

  async getProjectByGuid(guid: string): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`/projects/${guid}`);
  }

  // Dashboard
  async getDashboardStats(groupId: number): Promise<DashboardStats> {
    return this.request<DashboardStats>(`/dashboard/stats/${groupId}`);
  }

  // Volunteer Dashboard
  async getVolunteerDashboard(volunteerGuid: string): Promise<any> {
    return this.request<any>(`/volunteer-dashboard/${volunteerGuid}`);
  }

  async getVolunteerHistory(volunteerGuid: string): Promise<any[]> {
    return this.request<any[]>(`/history/volunteer/${volunteerGuid}`);
  }

  async getVolunteerCertificates(volunteerGuid: string): Promise<any[]> {
    return this.request<any[]>(`/certificates/volunteer/${volunteerGuid}`);
  }

  // User Profiles
  async getUserProfile(userGuid: string): Promise<UserProfileDTO> {
    return this.request<UserProfileDTO>(`/profiles/${userGuid}`);
  }

  async createOrUpdateProfile(data: UserProfileDTO): Promise<UserProfileDTO> {
    if (data.guid) {
        return this.request<UserProfileDTO>(`/profiles/${data.userGuid}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    } else {
        return this.request<UserProfileDTO>('/profiles', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
  }

  async searchProfilesByTag(tag: string): Promise<UserProfileDTO[]> {
    return this.request<UserProfileDTO[]>(`/profiles/search?tag=${encodeURIComponent(tag)}`);
  }

  async getAllTags(): Promise<string[]> {
    return this.request<string[]>('/profiles/tags');
  }

  async getVolunteers(tag?: string, page = 0, size = 10): Promise<Page<UserProfileDTO>> {
    const query = new URLSearchParams();
    if (tag && tag !== "all") query.append("tag", tag);
    query.append("page", page.toString());
    query.append("size", size.toString());
    
    return this.request<Page<UserProfileDTO>>(`/profiles/volunteers?${query.toString()}`);
  }
}

export const api = new ApiClient();
