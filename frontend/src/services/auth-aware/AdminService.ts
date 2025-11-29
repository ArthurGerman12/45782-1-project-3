import AuthAware from "../auth-aware/AuthAware";
import type Vacation from "../../models/Vacation";
import type VacationDraft from "../../models/VacationDraft";

class AdminService extends AuthAware {

    constructor(jwt: string, clientId: string) {
        super(jwt, clientId);
    }

    async remove(vacationId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.delete(
            `/follows/delete-vacation/${vacationId}`
        );
        return data;
    }

    async getReport() {
    const { data } = await this.axiosInstance.get("/follows/reports/vacations");
    return data;
    }


    async newVacation(draft: VacationDraft): Promise<Vacation> {
        const form = new FormData();
        form.append("destination", draft.destination);
        form.append("description", draft.description);
        form.append("price", draft.price.toString());
        form.append("startDate", draft.startDate);
        form.append("endDate", draft.endDate);
        
        if (draft.image && draft.image.length > 0) {
            form.append("image", draft.image[0]);
        }

        const { data } = await this.axiosInstance.post<Vacation>(
            "/follows/create-vacation",
            form
        );

        return data;
    }

    async getVacation(vacationId: string): Promise<Vacation> {
    const { data } = await this.axiosInstance.get<Vacation>(
        `/follows/vacation/${vacationId}`
    );
    return data;
}


    async editVacation(vacationId: string, draft: VacationDraft): Promise<Vacation> {
        const form = new FormData();
        form.append("destination", draft.destination);
        form.append("description", draft.description);
        form.append("price", draft.price.toString());
        form.append("startDate", draft.startDate);
        form.append("endDate", draft.endDate);

        if (draft.image && draft.image.length > 0) {
            form.append("image", draft.image[0]);
        }

        const { data } = await this.axiosInstance.patch<Vacation>(
            `/follows/update-vacation/${vacationId}`,
            form
        );

        return data;
    }
}

export default AdminService;
