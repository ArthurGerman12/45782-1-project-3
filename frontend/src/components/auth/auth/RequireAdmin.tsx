import { Navigate } from "react-router-dom";
import useUserRole from "../../hooks/use-user-role";
import type { PropsWithChildren } from "react";

export default function RequireAdmin({ children }: PropsWithChildren) {
    const role = useUserRole();

    if (role !== "admin") return <Navigate to="/feed" replace />;

    return <>{children}</>;
}
