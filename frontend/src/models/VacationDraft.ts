export default interface VacationDraft {
    destination: string;
    description: string;
    price: number;        // number, not string
    startDate: string;    // yyyy-mm-dd (from <input type="date">)
    endDate: string;      // yyyy-mm-dd
    image?: string;       // image URL or filename
    isFollowed: boolean
}
