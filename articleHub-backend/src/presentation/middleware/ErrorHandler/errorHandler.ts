import type { Request,Response } from 'express';
import { HTTP_STATUS } from '../../../domain/shared/Status';

export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
) => {
   req.body
   res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err.message);
};
