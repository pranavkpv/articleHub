import { Hasher } from "../../application/services/implementation/Hasher";
import { Token } from "../../application/services/implementation/Token";
import { CheckTemporarUserDataUseCase } from "../../application/usecases/implementation/CheckTemporarUserDataUseCase";
import { LoginUserUseCase } from "../../application/usecases/implementation/LoginUserUseCase";
import { RefreshTokenUseCase } from "../../application/usecases/implementation/RefreshTokenUsecase";
import { SaveUserDataTemporarlyUseCase } from "../../application/usecases/implementation/SaveUserDataTemporarlyUseCase";
import { UpdateTemporarUserDataUseCase } from "../../application/usecases/implementation/UpdateTemporarUserDataUseCase";
import { LoginController } from "../../presentation/controllers/implementation/Login.controller";
import { SignupController } from "../../presentation/controllers/implementation/Signup.controller";
import { AdminRepository } from "../repositories/implementation/AdminRepository";
import { UserRepository } from "../repositories/implementation/UserRepository";
import { VolunteerRepository } from "../repositories/implementation/VolunteerRepository";

const userRepository = new UserRepository()
const hasher = new Hasher()
const token = new Token()
const vounteerRepository = new VolunteerRepository()
const adminRepository = new AdminRepository()


const saveUserDataTemporarilyUseCase = new SaveUserDataTemporarlyUseCase(userRepository)
const checkTemporarUserDataUseCase = new CheckTemporarUserDataUseCase(userRepository,hasher)
const updateTemporarUserDataUseCase = new UpdateTemporarUserDataUseCase(userRepository)
const loginUserUseCase = new LoginUserUseCase(userRepository,hasher,token,vounteerRepository)
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository,token,vounteerRepository,adminRepository)

export const injectedSignupController = new SignupController(saveUserDataTemporarilyUseCase,checkTemporarUserDataUseCase,updateTemporarUserDataUseCase)
export const injectLoginController = new LoginController(loginUserUseCase,refreshTokenUseCase,token)
