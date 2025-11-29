import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../../vacations/feed/feed";
import NotFound from "../not-found/NotFound";
import Reports from "../../vacations/reports/reports";
import RequireAdmin from "../../auth/auth/RequireAdmin";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/feed" />} />

            <Route path="/feed" element={<Feed />} />

            <Route
                path="/reports"
                element={
                    <RequireAdmin>
                        <Reports />
                    </RequireAdmin>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
