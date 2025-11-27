export default interface User {
    id: string
    firstName: string
    lastName: string
    role: "user" | "admin"
    email: string
}