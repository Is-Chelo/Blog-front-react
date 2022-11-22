import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

export const HomeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};