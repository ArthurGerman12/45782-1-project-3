import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../../vacations/feed/feed"
import NotFound from "../not-found/NotFound";

export default function Main() {
    return (
        <Routes>
            {/* <Route path="/" element={<Profile />} /> */}
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
