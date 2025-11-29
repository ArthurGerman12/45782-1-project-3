import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type VacationDraft from "../../../models/VacationDraft"
import adminService from "../../../services/auth-aware/AdminService"
import Spinner from "../../common/spinner/Spinner"
import SpinnerButton from "../../common/spinner-button/SpinnerButton"
import useTitle from "../../hooks/use-title"

export default function EditVacation() {
    useTitle("Edit Vacation")
    const { vacationId } = useParams<'vacationId'>()

    const { register, handleSubmit, reset, formState } = useForm<VacationDraft>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isReady, setIsReady] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const vacation = await adminService.getVacation(vacationId!)
            const { destination, description, price, startDate, endDate } = vacation

            // reset accepts only primitive fields, not File
            reset({ destination, description, price, startDate, endDate })
            setIsReady(true)
        })()
    }, [vacationId, reset])

    async function submit(draft: VacationDraft) {
        try {
            setIsSubmitting(true)

            const form = new FormData()
            form.append("destination", draft.destination)
            form.append("description", draft.description)
            form.append("price", draft.price.toString())
            form.append("startDate", draft.startDate)
            form.append("endDate", draft.endDate)

            // File (optional)
            if (draft.image && draft.image.length > 0) {
                form.append("image", draft.image[0])
            }

            await adminService.editVacation(vacationId!, draft);
            navigate('/feed')

        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='EditVacation'>

            {!isReady && <Spinner />}

            {isReady && (
                <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">

                    {/* DESTINATION */}
                    <input
                        placeholder="Destination"
                        {...register('destination', {
                            required: "Destination is required",
                            minLength: { value: 10, message: 'At least 10 characters' }
                        })}
                    />
                    <div className='formError'>{formState.errors.destination?.message}</div>

                    {/* DESCRIPTION */}
                    <textarea
                        placeholder='Description'
                        {...register('description', {
                            required: "Description is required",
                            minLength: { value: 20, message: 'At least 20 characters' }
                        })}
                    ></textarea>
                    <div className='formError'>{formState.errors.description?.message}</div>

                    {/* PRICE */}
                    <input
                        type="number"
                        placeholder='Price'
                        {...register('price', {
                            required: "Price is required",
                            min: { value: 0, message: 'Cannot be negative' },
                            max: { value: 10000, message: 'Cannot exceed 10,000' }
                        })}
                    />
                    <div className='formError'>{formState.errors.price?.message}</div>

                    {/* START DATE */}
                    <input
                        type="date"
                        placeholder="Start Date"
                        {...register('startDate', {
                            required: "Start date is required"
                        })}
                    />
                    <div className='formError'>{formState.errors.startDate?.message}</div>

                    {/* END DATE */}
                    <input
                        type="date"
                        placeholder="End Date"
                        {...register('endDate', {
                            required: "End date is required"
                        })}
                    />
                    <div className='formError'>{formState.errors.endDate?.message}</div>

                    {/* IMAGE UPLOAD */}
                    <input
                        type="file"
                        accept="image/*"
                        {...register('image')}
                    />

                    <SpinnerButton
                        buttonText='Update Vacation'
                        loadingText='Updating...'
                        isSubmitting={isSubmitting}
                    />
                </form>
            )}

        </div>
    )
}
