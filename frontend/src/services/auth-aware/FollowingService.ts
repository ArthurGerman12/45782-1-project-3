import AuthAware from "./AuthAware";
import type VacationModel from "../../models/Vacation";

export default class FollowingService extends AuthAware {
    async getFollowing(): Promise<VacationModel[]> {
        const { data } = await this.axiosInstance<VacationModel[]>(`/follows/following`);
        return data;
    }

    async unfollow(vacationId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/follows/unfollow/${vacationId}`);
        return data;
    }

    async follow(vacationId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/follows/follow/${vacationId}`);
        return data;
    }
}

