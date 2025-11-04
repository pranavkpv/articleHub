import { Request, Response, NextFunction } from 'express';
import { Token } from '../../../application/services/implementation/Token';
import { HTTP_STATUS } from '../../../domain/shared/Status';
import { token } from '../../../domain/shared/messages/token';
import { Role } from '../../../domain/value-objects/role';

export const adminMiddleware = (jwtService: Token) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      const accessToken = authHeader?.split(' ')[1];

      // ✅ Check only access token for protected routes
      if (!accessToken) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.no_token });
        return;
      }

      // ✅ Verify the token
      const payload = jwtService.verifyAccessToken(accessToken);

      if (!payload) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.invalid_accessToken });
        return;
      }

      // ✅ Check admin role
      if (payload.role !== Role.admin) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.no_permission });
        return;
      }

      // Pass control
      next();
    } catch (error) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: token.invalid_accessToken });
    }
  };
};
