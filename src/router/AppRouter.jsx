import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CrearPost from "../views/CrearPost/CrearPost";
import { HomePage } from "../views/Home/HomePage";
import Login from "../views/Login/Login";
import PostsByUSer from "../views/PostsByUser/PostsByUSer";
import { SimplePost } from "../views/SimplePost/SimplePost";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simple-post/:id" element={<SimplePost />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<CrearPost />} />

            <Route path="/crear-post" element={<CrearPost />} />
            <Route path="/mis-post" element={<PostsByUSer />} />

            {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

            {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}

            {/* Login y Registro */}
            {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

            {/* JournalApp */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}
        </Routes>
    );
};
