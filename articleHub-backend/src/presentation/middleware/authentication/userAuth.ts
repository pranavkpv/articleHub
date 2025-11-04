import { Request, Response, NextFunction } from 'express';
import { Token } from '../../../application/services/implementation/Token';
import { HTTP_STATUS } from '../../../domain/shared/Status';
import { token } from '../../../domain/shared/messages/token';
import { Role } from '../../../domain/value-objects/role';

export const userMiddleware = (jwtService: Token) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      const accessToken = authHeader?.split(' ')[1];

      // ✅ Only access token is required
      if (!accessToken) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.no_token });
        return;
      }

      // ✅ Verify access token
      const payload = jwtService.verifyAccessToken(accessToken);

      if (!payload) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.invalid_accessToken });
        return;
      }

      // ✅ Ensure user role
      if (payload.role !== Role.user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.no_permission });
        return;
      }

      next();
    } catch (error) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.invalid_accessToken });
    }
  };
};
