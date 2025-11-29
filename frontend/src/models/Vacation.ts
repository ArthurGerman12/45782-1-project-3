export default interface Vacation {
    vacationId: string;
    destination: string;
    description: string;
    price: number;
    startDate: string;
    endDate: string;
    image: string; // <-- MUST stay a string
    likesCount: number;
}
