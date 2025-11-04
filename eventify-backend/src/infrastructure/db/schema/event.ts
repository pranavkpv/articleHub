import mongoose from 'mongoose';
import { IEventModelEntity } from '../interface/event';

export const eventSchema = new mongoose.Schema<IEventModelEntity>({
   description: {
      type: String,
   },
   event_name: {
      type: String,
      required: true
   },
   end_date: {
      type: Date,
      required: true
   },
   guests: {
      type: [String],
   },
   hosted_by: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   judges: {
      type: [String],
   },
   location: {
      type: String,
      required: true
   },
   meal_count: {
      type: Number,
   },
   participants: {
      type: [{ id: String, status: Boolean }]
   },
   start_date: {
      type: Date,
      required: true
   },
   rewards: {
      type: [{ title: String, price: Number }]
   },
   volunteers: {
      type: [String],
   },
   max_tickets: {
      type: Number
   },
   delete_status: {
      type: Boolean,
      default:false
   }
}, { timestamps: true });
