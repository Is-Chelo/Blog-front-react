import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Header = () => {
    const [logueado, setLogueado] = useState(false);
    const [datosUser, setDatosUser] = useState({});
    const estaLogueado = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setLogueado(true);
            setDatosUser(user);
        }
    };

    const logout = (e) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        location.reload("/");
    };

    useEffect(() => {
        estaLogueado();
    }, []);

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    zIndex: "10",
                    top: "-10px",
                    width: "110%",
                    backgroundColor: "rgb(0 0 0 / 13%)",
                    filter: "blur(0.5rem)",
                }}
            ></div>
            <div className="header">
                {/* {console.log(datosUser)} */}
                <nav className="navbar navbar-expand-lg m-0">
                    <div className="container">
                        <Link className="navbar-brand" to={"/"}>
                            LoGo
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to={"/"}
                                    >
                                        Inicio
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Sobre Mi
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Contactame
                                    </a>
                                </li>
                            </ul>
                            <div className="d-flex" role="search">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        {logueado === true ? (
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {datosUser.username}
                                            </a>
                                        ) : (
                                            <Link to={"/login"}>
                                                {" "}
                                                Login | Registro
                                            </Link>
                                        )}

                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to={"/mis-post"}
                                                >
                                                    Mis Post
                                                </Link>
                                            </li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/crear-post`}
                                            >
                                                Crear Nuevo Post
                                            </Link>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Mi perfil
                                                </a>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider"></hr>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={logout}
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
