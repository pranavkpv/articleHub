import { refreshOutput } from "../../../domain/entities/output";
import { Email } from "../../../domain/shared/messages/email";
import { token } from "../../../domain/shared/messages/token";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { Role } from "../../../domain/value-objects/role";
import { IAdminRepository } from "../../../infrastructure/repositories/interface/IAdminRepository";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IToken } from "../../services/interface/IToken";
import { IRefreshTokenUsecase } from "../interface/IRefreshTokenUsecase";

export class RefreshTokenUseCase implements IRefreshTokenUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _JwtService: IToken,
    private _volunteerRepository: IVolunteerRepository,
    private _adminRepository: IAdminRepository
  ) {}

  async execute(refreshToken: string): Promise<refreshOutput> {
    let payload;

    // ✅ safely verify refresh token
    try {
      payload = this._JwtService.verifyRefreshToken(refreshToken);
    } catch {
      return {
        success: false,
        message: token.no_token,
        status: HTTP_STATUS.UNAUTHORIZED,
        data: ''
      };
    }

    if (!payload) {
      return {
        success: false,
        message: token.no_token,
        status: HTTP_STATUS.CONFLICT,
        data: ''
      };
    }

    // ✅ find user based on role
    let user;
    switch (payload.role) {
      case Role.user:
        user = await this._userRepository.findUserById(payload._id);
        break;
      case Role.admin:
        user = await this._adminRepository.findAdminById(payload._id);
        break;
      case Role.volunteer:
        user = await this._volunteerRepository.findVolunteerById(payload._id);
        break;
      default:
        return {
          success: false,
          message: Email.notExist,
          status: HTTP_STATUS.CONFLICT,
          data: ''
        };
    }

    if (!user) {
      return {
        success: false,
        message: Email.notExist,
        status: HTTP_STATUS.CONFLICT,
        data: ''
      };
    }

    // ✅ generate new access token
    const accessToken = this._JwtService.createAccessToken({
      _id: user._id,
      role: payload.role
    });

    return {
      success: true,
      message: token.successToCreate,
      status: HTTP_STATUS.OK,
      data:  accessToken 
    };
  }
}
