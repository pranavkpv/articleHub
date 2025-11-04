import { Hasher } from "../../application/services/implementation/Hasher";
import { AddVolunteerUseCase } from "../../application/usecases/implementation/AddVolunteerUseCase";
import { AssignVolunteerToEventUsecase } from "../../application/usecases/implementation/AssignVolunteerToEventUsecase";
import { GetAllVolunteerUseCase } from "../../application/usecases/implementation/GetAllVolunteerUseCase";
import { GetVolunteerListUsecase } from "../../application/usecases/implementation/GetVolunteerListUseCase";
import { DeleteVolunteerUseCase } from "../../application/usecases/implementation/DeleteVolunteerUseCase";
import { VolunteerController } from "../../presentation/controllers/implementation/Volunteer.controller";
import { EventRepository } from "../repositories/implementation/EventRepository";
import { VolunteerRepository } from "../repositories/implementation/VolunteerRepository";
import { UserRepository } from "../repositories/implementation/UserRepository";
import { EditVolunteerUseCase } from "../../application/usecases/implementation/EditVolunteerUseCase";

const volunteerRepository = new VolunteerRepository()
const hasher = new Hasher()
const userRepository = new UserRepository()
const eventRepository = new EventRepository()
const addVolunteerUseCase = new AddVolunteerUseCase(volunteerRepository,userRepository,hasher)
const getVolunteerListUseCase = new GetVolunteerListUsecase(volunteerRepository)
const getAllVolunteerUseCase = new GetAllVolunteerUseCase(volunteerRepository)
const assignVolunteerToEvent = new AssignVolunteerToEventUsecase(eventRepository,volunteerRepository)
const deleteVolunteerUseCase = new DeleteVolunteerUseCase(volunteerRepository)
const editVolunteerUsecase = new EditVolunteerUseCase(volunteerRepository,userRepository,hasher)
export const injectVolunteerController = new VolunteerController(addVolunteerUseCase,getVolunteerListUseCase,
   getAllVolunteerUseCase,assignVolunteerToEvent,deleteVolunteerUseCase,editVolunteerUsecase)