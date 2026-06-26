import { type User, type InsertUser, type OngLead, type InsertOngLead } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createOngLead(lead: InsertOngLead): Promise<OngLead>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private ongLeads: Map<string, OngLead>;

  constructor() {
    this.users = new Map();
    this.ongLeads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOngLead(insertLead: InsertOngLead): Promise<OngLead> {
    const id = randomUUID();
    const lead: OngLead = {
      ...insertLead,
      id,
      createdAt: new Date().toISOString(),
    };
    this.ongLeads.set(id, lead);
    return lead;
  }
}

export const storage = new MemStorage();

