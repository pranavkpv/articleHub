import { listingInput } from "../../../domain/entities/event";
import { listVolRepo } from "../../../domain/entities/output";
import { addVoluntRepos, editVolunteerData, editVolunteerRepo } from "../../../domain/entities/volunteer";
import { IVolunteerEntity } from "../../db/interface/volunteer";
import { volunteerDB } from "../../db/model/volunteer";
import { IVolunteerRepository } from "../interface/IVolunteerRepository";

export class VolunteerRepository implements IVolunteerRepository {
    async findUserByEmail(email: string): Promise<IVolunteerEntity | null> {
        return await volunteerDB.findOne({ email: { $regex: email, $options: "i" } })
    }
    async findVolunteerById(id: string): Promise<IVolunteerEntity | null> {
        return await volunteerDB.findById(id)
    }
    async generateRandomPassword(): Promise<string> {
        let result = '';
        const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()><?';
        for (let i = 0; i < 10; i++) {
            result += char[Math.floor(Math.random() * char.length)];
        }
        return result;
    }
    async saveVolunteer(data: addVoluntRepos): Promise<boolean> {
        const newVolunteer = new volunteerDB(data)
        await newVolunteer.save()
        return true
    }
    async getAllVoulunteer(data: listingInput): Promise<listVolRepo> {
        const volunteer = await volunteerDB.find({ username: { $regex: data.search, $options: "i" }, delete_status: false }).skip((data.page - 1) * 10)
        const totalDoc = await volunteerDB.find({ username: { $regex: data.search, $options: "i" }, delete_status: false })
        return {
            data: volunteer,
            total: Math.ceil(totalDoc.length / 10)
        }
    }
    async findAllVolunteer(): Promise<IVolunteerEntity[]> {
        return await volunteerDB.find({ delete_status: false })
    }
    async updateDeleteStatusVolunteer(id: string): Promise<void> {
        await volunteerDB.findByIdAndUpdate(id, { delete_status: true })
    }
    async updateVolunteer(data: editVolunteerRepo): Promise<void> {
        const { _id, email, phone, username, password } = data
        await volunteerDB.findByIdAndUpdate(_id, { email, phone, username, password })
    }
    async findUserByEmailInEdit(data: editVolunteerData): Promise<IVolunteerEntity | null> {
        return await volunteerDB.findOne({ _id: { $ne: data._id }, email: data.email })
    }
}