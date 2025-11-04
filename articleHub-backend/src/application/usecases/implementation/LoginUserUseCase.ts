import { loginOutput } from "../../../domain/entities/output";
import { generateTokenData, loginData } from "../../../domain/entities/user";
import { Email } from "../../../domain/shared/messages/email";
import { Password } from "../../../domain/shared/messages/password";
import { token } from "../../../domain/shared/messages/token";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { admin } from "../../../domain/value-objects/admin";
import { Role } from "../../../domain/value-objects/role";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IHasher } from "../../services/interface/IHasher";
import { IToken } from "../../services/interface/IToken";
import { ILoginUserUseCase } from "../interface/ILoginUserUseCase";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _hasher: IHasher,
    private _token: IToken,
    private _vounteerRepository: IVolunteerRepository
  ) {}

  async execute(data: loginData): Promise<loginOutput> {
    // 🟢 Admin Login
    if (data.email === admin.email) {
      if (data.password === admin.password) {
        const tokenData: generateTokenData = {
          _id: admin._id,
          role: Role.admin,
        };

        const accessToken = this._token.createAccessToken(tokenData);
        const refreshToken = this._token.createRefreshToken(tokenData);

        if (!accessToken || !refreshToken) {
          return {
            success: false,
            message: token.failToCreate,
            status: HTTP_STATUS.CONFLICT,
            data: { accessToken: "", refreshToken: "", role: "" },
          };
        }

        return {
          success: true,
          message: token.successToCreate,
          status: HTTP_STATUS.OK,
          data: { accessToken, refreshToken, role: Role.admin },
        };
      } else {
        return {
          success: false,
          message: Password.wrong,
          status: HTTP_STATUS.CONFLICT,
          data: { accessToken: "", refreshToken: "", role: "" },
        };
      }
    }

    // 🟢 Find user or volunteer
    const user = await this._userRepository.findUserByEmail(data.email);
    const volunteer = await this._vounteerRepository.findUserByEmail(data.email);

    if (!user && !volunteer) {
      return {
        success: false,
        message: Email.notExist,
        status: HTTP_STATUS.CONFLICT,
        data: { accessToken: "", refreshToken: "", role: "" },
      };
    }

    // 🟢 Normal User Login
    if (user) {
      const passwordCheck = await this._hasher.compare(data.password, user.password);
      if (!passwordCheck) {
        return {
          success: false,
          message: Password.wrong,
          status: HTTP_STATUS.CONFLICT,
          data: { accessToken: "", refreshToken: "", role: "" },
        };
      }

      const tokenData: generateTokenData = {
        _id: user._id,
        role: Role.user,
      };

      const accessToken = this._token.createAccessToken(tokenData);
      const refreshToken = this._token.createRefreshToken(tokenData);

      if (!accessToken || !refreshToken) {
        return {
          success: false,
          message: token.failToCreate,
          status: HTTP_STATUS.CONFLICT,
          data: { accessToken: "", refreshToken: "", role: "" },
        };
      }

      return {
        success: true,
        message: token.successToCreate,
        status: HTTP_STATUS.OK,
        data: { accessToken, refreshToken, role: Role.user },
      };
    }

    // 🟢 Volunteer Login
    if (volunteer) {
      if (volunteer.delete_status) {
        return {
          success: false,
          message: "Volunteer account has been deleted.",
          status: HTTP_STATUS.CONFLICT,
          data: { accessToken: "", refreshToken: "", role: "" },
        };
      }

      const passwordCheck = await this._hasher.compare(data.password, volunteer.password);
      if (!passwordCheck) {
        return {
          success: false,
          message: Password.wrong,
          status: HTTP_STATUS.CONFLICT,
          data: { accessToken: "", refreshToken: "", role: "" },
        };
      }

      const tokenData: generateTokenData = {
        _id: volunteer._id,
        role: Role.volunteer,
      };

      const accessToken = this._token.createAccessToken(tokenData);
      const refreshToken = this._token.createRefreshToken(tokenData);

      if (!accessToken || !refreshToken) {
        return {
          success: false,
          message: token.failToCreate,
          status: HTTP_STATUS.CONFLICT,
          data: { accessToken: "", refreshToken: "", role: "" },
        };
      }

      return {
        success: true,
        message: token.successToCreate,
        status: HTTP_STATUS.OK,
        data: { accessToken, refreshToken, role: Role.volunteer },
      };
    }

    return {
      success: false,
      message: Email.notExist,
      status: HTTP_STATUS.CONFLICT,
      data: { accessToken: "", refreshToken: "", role: "" },
    };
  }
}
