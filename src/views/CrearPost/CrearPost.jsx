import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import MDEditor from "@uiw/react-md-editor";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const CrearPost = () => {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const [dataCategories, setDataCategories] = useState([]);
    const navigate = useNavigate();
    const [valueForm, setValueForm] = useState({});
    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const getCategories = async () => {
        const response = await fetch(
            ` https://blog-strapi-production.up.railway.app/api/categories`
        );
        const { data } = await response.json();
        setDataCategories(data);
    };

    const onChange = (e) => {
        e.preventDefault();
        setValueForm({
            ...valueForm,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            valueForm.contenido = value;
            valueForm.user = user.id;

            if (
                valueForm.titulo === undefined ||
                valueForm.descripcion === undefined ||
                valueForm.contenido === undefined ||
                valueForm.category === undefined
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Los Campos no pueden ir vacios ",
                    text: "Error al crear un post",
                });
                return;
            }
            console.log(JSON.stringify(valueForm, null, 4))
            const fetchResponse = await fetch(
                `https://blog-strapi-production.up.railway.app/api/posts`,
                {
                    mode: "cors",
                    method: "POST",
                    body: JSON.stringify({
                        data: valueForm,
                    }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const respuesta = await fetchResponse.json();

            if (respuesta?.error) {
                Swal.fire({
                    icon: "error",
                    title: "",
                    text: "Error al crear un post",
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "El post se creo con exito ",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            }
        } catch (e) {
            console.log(e);
            return e;
        }
    };
    useEffect(() => {
        getCategories();
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (token === undefined) {
            Swal.fire({
                icon: "error",
                title: "Para crear un post debe registrarse",
                text: "<a href='/login'>Login | Registro </a>",
            });
            return;
        }
        setToken(token);
        setUser(user);
        
    }, []);

    return (
        <>
            <Header />
            <Banner
                titulo="Creacion de un Post"
                descripcion="Recuerda que este post sera revizado por el personal a cargo"
            />
            <form onChange={onChange} onSubmit={onSubmit}>
                <div className="container mt-5">
                    <div className="mb-3">
                        <label
                            for="exampleFormControlInput1"
                            className="form-label"
                        >
                            Titulo
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            name="titulo"
                            placeholder="Primer post..."
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            for="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Descripcion
                        </label>
                        <textarea
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label
                            for="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Categoria
                        </label>
                        <select
                            className="form-select"
                            name="category"
                            aria-label="Categoria"
                        >
                            <option selected defaultValue="">
                                Seleccionar una Categoria
                            </option>

                            {dataCategories.map((dato, i) => {
                                const { nombre } = dato.attributes;
                                return (
                                    <option
                                        value={dato.id}
                                        key={dato.id}
                                    >
                                        {nombre}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label
                            for="exampleFormControlInput1"
                            className="form-label"
                        >
                            Imagen de portada
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="portada_imagen_url"
                            name="portada_imagen_url"
                            placeholder="Primer post..."
                        />
                    </div>
                    <div className="row mt-5">
                        <div className="col-xs-12 col-md-6">
                            <div className="mb-3">
                                <label
                                    for="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Contenido
                                </label>
                                <div className="">
                                    <MDEditor
                                        value={value}
                                        onChange={setValue}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="mb-3">
                                <label
                                    for="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Previzualizador
                                </label>
                                <div className="">
                                    <MDEditor.Markdown
                                        source={value}
                                        style={{ whiteSpace: "pre-wrap" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label
                            for="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            URL video
                        </label>
                        <input
                            className="form-control"
                            id="url_video"
                            name="url_video"
                            rows="3"
                        />
                    </div>
                </div>
                <div className="container mt-3">
                    <button type="submit" className="btn btn-outline-dark">
                        Guarda Publicacion
                    </button>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default CrearPost;



