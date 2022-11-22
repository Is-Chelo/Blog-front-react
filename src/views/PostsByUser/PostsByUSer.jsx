import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import PostTheLikest from "../../components/PostTheLikest";

const PostsByUSer = () => {
    const [dataPost, setDataPost] = useState([]);

    const getPosts = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(
            `https://blog-strapi-production.up.railway.app/api/users/${user.id}?populate=*`
        );
        try {
            const response = await fetch(
                `https://blog-strapi-production.up.railway.app/api/users/${user.id}?populate=*`
            );
            const data = await response.json();
            
            setDataPost([data.post]);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
        <Header/>
        <Banner/>
            <div className="container mt-5">
                <div className="row mb-2 mt-4">
                    {dataPost.map((dato, i) => {
                        const {
                            titulo,
                            descripcion,
                            slug,
                            createdAt,
                            portada_imagen_url,
                        } = dato;
                        return (
                            <div key={i} className="col-md-6">
                                <PostTheLikest
                                    titulo={titulo}
                                    descripcion={descripcion}
                                    slug={slug}
                                    creado={createdAt}
                                    id={dato.id}
                                    imagen={portada_imagen_url}
                                    button={true}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default PostsByUSer;
