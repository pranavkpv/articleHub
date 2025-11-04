
import { generateTokenData, loginData, loginOutput } from "../../../domain/entities/user";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IHasher } from "../../services/interface/IHasher";
import { IToken } from "../../services/interface/IToken";
import { ILoginUserUseCase } from "../interface/ILoginUserUseCase";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _hasher: IHasher,
    private _token: IToken,
  ) { }

  async execute(data: loginData): Promise<loginOutput> {

    const user = await this._userRepository.findUserByEmail(data.email);

    if (!user) {
      return {
        success: false,
        message: 'email not exist',
        status: HTTP_STATUS.CONFLICT,
        data: { accessToken: "", refreshToken: "", role: "" },
      };
    }

    const passwordCheck = await this._hasher.compare(data.password, user.password);
    if (!passwordCheck) {
      return {
        success: false,
        message: 'password is wrong',
        status: HTTP_STATUS.CONFLICT,
        data: { accessToken: "", refreshToken: "", role: "" },
      };
    }

    const tokenData: generateTokenData = {
      _id: user._id,
      role: 'user',
    };

    const accessToken = this._token.createAccessToken(tokenData);
    const refreshToken = this._token.createRefreshToken(tokenData);

    if (!accessToken || !refreshToken) {
      return {
        success: false,
        message: 'failed to create token',
        status: HTTP_STATUS.CONFLICT,
        data: { accessToken: "", refreshToken: "", role: "" },
      };
    }

    return {
      success: true,
      message: 'token create success',
      status: HTTP_STATUS.OK,
      data: { accessToken, refreshToken, role: 'user' },
    };
  }

}
