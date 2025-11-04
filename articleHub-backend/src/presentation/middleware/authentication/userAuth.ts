import { Request, Response, NextFunction } from 'express';
import { Token } from '../../../application/services/implementation/Token';
import { HTTP_STATUS } from '../../../domain/shared/Status';

export const userMiddleware = (jwtService: Token) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      const accessToken = authHeader?.split(' ')[1];

      if (!accessToken) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: "no token" });
        return;
      }

      const payload = jwtService.verifyAccessToken(accessToken);

      if (!payload) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: "token.invalid_accessToken" });
        return;
      }

      next();
    } catch (error) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: "token.invalid_accessToken" });
    }
  };
};
