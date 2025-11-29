import axios from "axios"
import type Vacation from "../../models/Vacation"
import type VacationDraft from "../../models/VacationDraft"

class AdminService {
    
    async remove(vacationId: string): Promise<boolean> {
        const response = await axios.delete(
            `${import.meta.env.VITE_REST_SERVER_URL}/follows/delete-vacation/${vacationId}`
        );
        return response.data;
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

        const response = await axios.post<Vacation>(
            `${import.meta.env.VITE_REST_SERVER_URL}/follows/create-vacation`,
            form,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        return response.data;
    }

    async getVacation(vacationId: string): Promise<Vacation> {
        const response = await axios.get<Vacation>(
            `${import.meta.env.VITE_REST_SERVER_URL}/follows/update-vacation/${vacationId}`
        );
        return response.data;
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

        const response = await axios.patch<Vacation>(
            `${import.meta.env.VITE_REST_SERVER_URL}/follows/update-vacation/${vacationId}`,
            form,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        return response.data;
    }
}

const adminService = new AdminService();
export default adminService;
