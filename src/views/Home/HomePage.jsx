import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import PostTheLikest from "../../components/PostTheLikest";
import CategoryHome from "../../components/CategoryHome";
import Footer from "../../components/Footer";

export const HomePage = () => {
    const [dataPost, setDataPost] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);
    const getPosts = async () => {
        const response = await fetch(
            ` https://blog-strapi-production.up.railway.app/api/posts`
        );
        const { data } = await response.json();
        setDataPost(data);
    };
    const getCategories = async () => {
        const response = await fetch(
            ` https://blog-strapi-production.up.railway.app/api/categories`
        );
        const { data } = await response.json();
        setDataCategories(data);
    };
    useEffect(() => {
        getPosts();
        getCategories();
    }, []);

    return (
        <>
            <Header />
            <Banner imagen="https://static.vecteezy.com/system/resources/previews/001/987/723/original/abstract-banner-technology-stripes-geometric-diagonal-pink-blue-background-free-vector.jpg"/>
            {/* Categorias Listaremos todas las categorias desde el back pero aun
            hay que buscar el disenio */}

            <div className="container mt-5">
                {dataCategories.map((dato, i) => {
                    const { descripcion, nombre, createdAt } = dato.attributes;
                    return (
                        <CategoryHome
                            key={i}
                            nombre={nombre}
                            descripcion={descripcion}
                            creado={createdAt}
                        />
                    );
                })}
            </div>

            <div className="container mt-5">
                <div className="row mb-2 mt-4">
                    {dataPost.map((dato, i) => {
                        const { titulo, descripcion, slug, createdAt, portada_imagen_url } =
                            dato.attributes;
                            console.log(portada_imagen_url)
                        return (
                            <div key={i} className="col-md-6">
                                <PostTheLikest
                                    titulo={titulo}
                                    descripcion={descripcion}
                                    slug={slug}
                                    creado={createdAt}
                                    id={dato.id}
                                    imagen={portada_imagen_url}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer/>
        </>
    );
};
