import express from "express";
import {
  getAllTickets,
  updateATicket,
  deleteATicket,
  createTicket,
} from "./ticketsControllers.js";

const usersTicketsRouter = express.Router();

usersTicketsRouter.get("/api/tickets", getAllTickets);
usersTicketsRouter.post("/tickets/create", createTicket);
usersTicketsRouter.put("/api/tickets/:id", updateATicket);
usersTicketsRouter.delete("/api/tickets/:id", deleteATicket);

export default usersTicketsRouter;
