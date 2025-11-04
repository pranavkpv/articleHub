import { refreshOutput } from "../../../domain/entities/user";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IToken } from "../../services/interface/IToken";
import { IRefreshTokenUsecase } from "../interface/IRefreshTokenUsecase";

export class RefreshTokenUseCase implements IRefreshTokenUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _JwtService: IToken,
  ) { }

  async execute(refreshToken: string): Promise<refreshOutput> {
    let payload;

    try {
      payload = this._JwtService.verifyRefreshToken(refreshToken);
    } catch {
      return {
        success: false,
        message: "no token",
        status: HTTP_STATUS.UNAUTHORIZED,
        data: ''
      };
    }

    if (!payload) {
      return {
        success: false,
        message: "no token",
        status: HTTP_STATUS.CONFLICT,
        data: ''
      };
    }
    let user = await this._userRepository.findUserById(payload._id);


    if (!user) {
      return {
        success: false,
        message: "user not exist",
        status: HTTP_STATUS.CONFLICT,
        data: ''
      };
    }
    const accessToken = this._JwtService.createAccessToken({
      _id: user._id,
      role: payload.role
    });

    return {
      success: true,
      message: "new token created",
      status: HTTP_STATUS.OK,
      data: accessToken
    };
  }
}
