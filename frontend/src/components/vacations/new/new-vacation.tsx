import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type VacationDraft from "../../../models/VacationDraft";
import SpinnerButton from "../../common/spinner-button/SpinnerButton";
import useTitle from "../../hooks/use-title";
import AdminService from "../../../services/auth-aware/AdminService";
import useService from "../../hooks/use-service";
import { useAppDispatcher } from "../../../redux/hooks";
import { newVacation as newVacationAction } from "../../../redux/admin-slice";
import { bump } from "../../../redux/feedVersion-slice";
import "./new-vacation.css";

export default function NewVacation() {
    useTitle("New Vacation");

    const adminService = useService(AdminService);
    const { register, handleSubmit, formState} = useForm<VacationDraft>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const apiBase = import.meta.env.VITE_REST_SERVER_URL.replace(/\/$/, "");

    const navigate = useNavigate();
    const dispatch = useAppDispatcher();

    function formatPreview(value: string) {
        if (!value) return null;
        if (value.startsWith("http")) return value;
        return `${apiBase}/images/${value}`;
    }

    async function submit(draft: VacationDraft) {
        try {
            setIsSubmitting(true);

            const created = await adminService.newVacation(draft);

            dispatch(newVacationAction(created));
            dispatch(bump());
            navigate("/feed");

        } catch (err) {
            console.error(err);
            alert("Failed to create vacation.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="EditVacation">
            <form className="edit-form" onSubmit={handleSubmit(submit)}>

                {/* IMAGE PREVIEW */}
                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" className="preview-img" />
                    </div>
                )}

                {/* DESTINATION */}
                <input
                    placeholder="Destination"
                    {...register("destination", {
                        required: "Destination is required",
                        minLength: { value: 10, message: "At least 10 characters" }
                    })}
                />
                <div className="formError">{formState.errors.destination?.message}</div>

                {/* DESCRIPTION */}
                <textarea
                    placeholder="Description"
                    {...register("description", {
                        required: "Description is required",
                        minLength: { value: 20, message: "At least 20 characters" }
                    })}
                />
                <div className="formError">{formState.errors.description?.message}</div>

                {/* PRICE */}
                <input
                    type="number"
                    placeholder="Price"
                    {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 10000, message: "Cannot exceed 10,000" }
                    })}
                />
                <div className="formError">{formState.errors.price?.message}</div>

                {/* START DATE */}
                <input
                    type="date"
                    {...register("startDate", { required: "Start date is required" })}
                />
                <div className="formError">{formState.errors.startDate?.message}</div>

                {/* END DATE */}
                <input
                    type="date"
                    {...register("endDate", { required: "End date is required" })}
                />
                <div className="formError">{formState.errors.endDate?.message}</div>

                {/* IMAGE URL OR FILENAME */}
                <input
                    type="text"
                    placeholder="Image filename (e.g., beach.jpg) or full URL"
                    {...register("image", {
                        required: "Image is required",
                        onChange: (e) => setPreview(formatPreview(e.target.value))
                    })}
                />
                <div className="formError">{formState.errors.image?.message}</div>

                <SpinnerButton
                    buttonText="Create Vacation"
                    loadingText="Creating..."
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
}
