import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOngLeadSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.post("/api/ong-leads", async (req, res) => {
    const parseResult = insertOngLeadSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ 
        message: parseResult.error.errors[0]?.message || "Dados inválidos" 
      });
    }
    
    try {
      const lead = await storage.createOngLead(parseResult.data);
      return res.status(201).json({ success: true, lead });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Erro interno do servidor" });
    }
  });

  return httpServer;
}

