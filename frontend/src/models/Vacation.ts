import type User from "./User"
import type VacationDraft from "./VacationDraft"

export default interface Vacation extends VacationDraft {
    vacationId: string
    userId: string
    user: User
}