import { Request, Response, NextFunction } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;

export const validateSaveVolunteer: AsyncHandler = async (req, res, next) => {
   const { username, email, phone } = req.body;

   if (!username || !/^[A-Za-z\s]+$/.test(username)) {
      res.status(400).json({ message: "Username is required and must contain only letters.", success: false });
      return
   }

   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: "Valid email is required.", success: false });
      return
   }

   if (!phone || !/^\d{10}$/.test(phone)) {
      res.status(400).json({ message: "Phone number is required and must be 10 digits.", success: false });
      return
   }

   next();
};
