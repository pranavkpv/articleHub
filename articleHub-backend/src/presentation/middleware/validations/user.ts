import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../domain/shared/Status";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;

export const validatePassword: AsyncHandler = async (req, res, next) => {
   const { currentpassword, newpassword } = req.body;

   const trimmedCurrent = currentpassword?.trim();
   const trimmedNew = newpassword?.trim();

   if (!trimmedCurrent || !trimmedNew) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         error: "Current password and new password are required",
      });
      return
   }

   if (typeof trimmedCurrent !== "string" || typeof trimmedNew !== "string") {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         error: "Password must be a string",
      });
      return
   }

   if (trimmedCurrent.length < 6 || trimmedCurrent.length > 50) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         error: "Current password must be between 6 and 50 characters",
      });
      return
   }

   if (trimmedNew.length < 8 || trimmedNew.length > 50) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         error: "New password must be between 8 and 50 characters",
      });
      return
   }

   const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   if (!strongPasswordRegex.test(trimmedNew)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         error:
            "New password must contain at least one uppercase, one lowercase, one number, and one special character",
      });
      return
   }

   if (trimmedCurrent === trimmedNew) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         error: "New password cannot be the same as current password",
      });
      return
   }

   req.body.currentpassword = trimmedCurrent;
   req.body.newpassword = trimmedNew;

   next();
};

//validate profile

export const validatEditProfile: AsyncHandler = async (req, res, next) => {
   let { firstname, lastname, email, phone, DOB, preferences } = req.body;

   // Trim strings
   const first = firstname?.trim();
   const last = lastname?.trim();
   const mail = email?.trim();
   const ph = phone?.trim();

   // ------------------ REQUIRED CHECK ------------------
   if (!first || !last || !mail || !ph || !DOB) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "firstname, lastname, email, phone, and DOB are required",
      });
      return
   }

   // ------------------ TYPE CHECK ------------------
   if (
      typeof first !== "string" ||
      typeof last !== "string" ||
      typeof mail !== "string" ||
      typeof ph !== "string"
   ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "firstname, lastname, email, and phone must be strings",
      });
      return
   }

   // ------------------ NAME VALIDATION ------------------
   if (first.length < 2 || first.length > 30) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Firstname must be between 2 and 30 characters",
      });
      return
   }

   if (last.length < 2 || last.length > 30) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Lastname must be between 2 and 30 characters",
      });
      return
   }

   const nameRegex = /^[A-Za-z]+$/;
   if (!nameRegex.test(first) || !nameRegex.test(last)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Firstname and Lastname must contain only alphabets",
      });
      return
   }

   // ------------------ EMAIL VALIDATION ------------------
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(mail)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Invalid email format",
      });
      return
   }

   if (mail.length > 50) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Email cannot exceed 50 characters",
      });
      return
   }

   // ------------------ PHONE VALIDATION ------------------
   const phoneRegex = /^[0-9]{10}$/;
   if (!phoneRegex.test(ph)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Phone must be a 10-digit numeric value",
      });
      return
   }

   // ------------------ DOB VALIDATION (VALID DATE) ------------------
   const dateObj = new Date(DOB);
   if (isNaN(dateObj.getTime())) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Invalid date format for DOB",
      });
      return
   }

   // ------------------ AGE VALIDATION ------------------
   const today = new Date();
   let age = today.getFullYear() - dateObj.getFullYear();
   const m = today.getMonth() - dateObj.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < dateObj.getDate())) {
      age--;
   }

   if (age < 10 || age > 100) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: "Age must be between 10 and 100 years",
      });
      return
   }

   // ------------------ PREFERENCES VALIDATION ------------------
   preferences = JSON.parse(preferences)
   if (preferences !== undefined) {
      if (!Array.isArray(preferences)) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Preferences must be an array",
         });
         return
      }

      if (preferences.length > 20) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Preferences cannot exceed 20 items",
         });
         return
      }

      for (let p of preferences) {
         if (typeof p !== "string" || p.trim().length === 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
               message: "Each preference must be a non-empty string",
            });
            return
         }

         if (p.length > 50) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
               message: "Each preference cannot exceed 50 characters",
            });
            return
         }
      }
   }

   req.body.firstname = first;
   req.body.lastname = last;
   req.body.email = mail;
   req.body.phone = ph;

   next();
};
