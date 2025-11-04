import { Token } from "../../application/services/implementation/Token";
import { BookEventUseCase } from "../../application/usecases/implementation/BookEventUseCase";
import { DeleteEventUseCase } from "../../application/usecases/implementation/DeleteEventUseCase";
import { GetAdminEventUseCase } from "../../application/usecases/implementation/GetAdminEventUseCase";
import { GetUserBaseEventUseCase } from "../../application/usecases/implementation/GetUserBaseEventUseCase";
import { GetUserEventUseCase } from "../../application/usecases/implementation/GetUserEventUseCase";
import { GetVolunteerEventUseCase } from "../../application/usecases/implementation/GetVolunteerEventUseCase";
import { MarkFoodAteUseCase } from "../../application/usecases/implementation/MarkFoodAteUseCase";
import { SaveEventUsecase } from "../../application/usecases/implementation/SaveEventUseCase";
import { TakeAttendanceUseCase } from "../../application/usecases/implementation/TakeAttendanceUseCase";
import { UpdateEventUseCase } from "../../application/usecases/implementation/UpdateEventUseCase";
import { EventController } from "../../presentation/controllers/implementation/Event.controller";
import { EventMapper } from "../../presentation/mapper/implementation/Eventmapper";
import { EventRepository } from "../repositories/implementation/EventRepository";
import { FoodRepository } from "../repositories/implementation/FoodRepository";
import { UserRepository } from "../repositories/implementation/UserRepository";
import { VolunteerRepository } from "../repositories/implementation/VolunteerRepository";

const eventRepository = new EventRepository()
const volunteerReposity = new VolunteerRepository()
const tokenservice = new Token()
const userRepository = new UserRepository()
const foodRepository = new FoodRepository()
const eventmapper = new EventMapper(volunteerReposity, userRepository)

const saveEventUseCase = new SaveEventUsecase(eventRepository)
const getAdminEventUseCase = new GetAdminEventUseCase(eventRepository, eventmapper)
const getUserEventUseCase = new GetUserEventUseCase(eventRepository, eventmapper)
const bookEventUsecase = new BookEventUseCase(eventRepository, userRepository)
const takeAttendanceUsecase = new TakeAttendanceUseCase(eventRepository, userRepository)
const getVolunteerEventUseCase = new GetVolunteerEventUseCase(eventRepository, eventmapper)
const markFoodAteUseCase = new MarkFoodAteUseCase(foodRepository, userRepository, eventRepository)
const deleteEventUsecase = new DeleteEventUseCase(eventRepository)
const updateEventUseCase = new UpdateEventUseCase(eventRepository)
const getUserBaseEventUseCase = new GetUserBaseEventUseCase(eventRepository,eventmapper)

export const injectedEventController = new EventController(saveEventUseCase, getAdminEventUseCase, getUserEventUseCase,
   bookEventUsecase, tokenservice, takeAttendanceUsecase, getVolunteerEventUseCase, markFoodAteUseCase,deleteEventUsecase,
   updateEventUseCase,getUserBaseEventUseCase)