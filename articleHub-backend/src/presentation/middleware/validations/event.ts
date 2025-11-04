import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { event } from "../../../domain/shared/messages/event";
import { FileArray, UploadedFile } from 'express-fileupload';


type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;

export const validateSaveEvent: AsyncHandler = async (req, res, next) => {
   const error = (msg: string) => {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: msg });
   }
   const files = req.files as FileArray;
   const file = files?.file as UploadedFile | undefined;
   if (!file || Array.isArray(file)) {
      error(event.image_require);
      return
   }
   const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
   if (!allowedMimeTypes.includes(file.mimetype)) {
      error("Only image files are allowed. Videos and documents are not accepted.");
      return;
   }
   let { event_name, start_date, end_date, location, description, rewards, hosted_by, guests, meal_count, max_tickets } = req.body
   rewards = JSON.parse(rewards);
   guests = JSON.parse(guests);

   if (!event_name || typeof event_name !== "string" || event_name.trim().length < 3 || event_name.trim().length > 50) {
      error(event.nameLong);
      return
   }
   if (!isNaN(Number(event_name)) || !isNaN(Number(location)) || !isNaN(Number(description)) || !isNaN(Number(hosted_by))) {
      error(event.nametype);
      return;
   }

   if (!hosted_by || typeof hosted_by !== "string" || hosted_by.trim().length < 3 || hosted_by.trim().length > 25) {
      error(event.hostLong);
      return
   }
   if (!location || typeof location !== "string" || location.trim().length < 3 || location.trim().length > 25) {
      error(event.locationLong);
      return
   }
   if (!description || typeof description !== "string" || description.trim().length < 10 || description.trim().length > 200) {
      error(event.descriptionLong);
      return
   }
   if (!start_date || !end_date) {
      error(event.startDate_endDtae);
      return
   }

   const start = new Date(start_date);
   const end = new Date(end_date);
   if (end < start) {
      error(event.endDatecond);
      return
   }


   if (!Array.isArray(rewards) || rewards.length === 0) {
      error(event.reward_required);
      return
   }
   for (const r of rewards) {
      if (!r.title || typeof r.title !== "string" || !r.price) {
         error(event.valid_reward);
         return
      }
      if (r.price < 0) {
         error(event.reward_amount)
         return
      }
   }


   if (guests.length == 0) {
      error(event.guest_add);
      return
   }

   const mealNum = parseInt(meal_count, 10);
   if (isNaN(mealNum) || mealNum < 0) {
      error(event.meal_count);
      return
   }
   const maxTicketsNum = parseInt(max_tickets, 10);
   if (isNaN(maxTicketsNum) || maxTicketsNum <= 0) {
      error(event.max_ticken_positive);
      return
   }
   next();
};



