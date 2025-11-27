import type Vacation from "../../models/Vacation";
import AuthAware from "./AuthAware";

export default class FeedService extends AuthAware {
    async getFeed(): Promise<Vacation[]> {
        const { data } = await this.axiosInstance<Vacation[]>(`/feed`);
        return data;
    }
    


}


