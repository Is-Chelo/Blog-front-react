import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import ReactMarkdown from "react-markdown";
import Footer from "../../components/Footer";
import CategoryPost from "../../components/CategoryPost";

export const SimplePost = () => {
    const [dataPost, setDataPost] = useState([]);
    const [user, setUser] = useState();

    const { pathname } = useLocation();
    const id = pathname.split("/")[2];

    const getPostById = async () => {
        const response = await fetch(
            ` https://blog-strapi-production.up.railway.app/api/posts/${id}`
        );
        const { data } = await response.json();
        console.log(data);
        setDataPost(data.attributes);
        setUser(data.users);
    };
    useEffect(() => {
        getPostById();
    }, []);

    return (
        <>
            {console.log(dataPost)}
            <Header />
            {dataPost ? (
                <>
                    <Banner
                        titulo={dataPost.titulo}
                        descripcion={dataPost.descripcion}
                        imagen={dataPost.portada_imagen_url}
                    />

                    <main className="container">
                        <div className="row mt-5 g-5">
                            <div className="col-md-8">
                                <h3 className="pb-4 mb-4 fst-italic border-bottom">
                                    Empecemos con la Guia de {dataPost.titulo}
                                </h3>

                                <article className="blog-post">
                                    <h2 className="blog-post-title">
                                        {dataPost.titulo}
                                    </h2>
                                    <p className="blog-post-meta">
                                        {moment(dataPost.createdAt).format(
                                            "LL"
                                        )}{" "}
                                        <br />
                                        Autor:
                                        <a href="#">{dataPost?.users?.data[0]?.attributes.username}</a>
                                    </p>
                                    <hr />
                                    <div>
                                        <ReactMarkdown>
                                            {dataPost.contenido}
                                        </ReactMarkdown>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <CategoryPost />
                            </div>
                        </div>
                        <article class="blog-post">
                            <iframe
                                width="560"
                                height="315"
                                src={dataPost.url_video}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </article>
                    </main>
                </>
            ) : (
                <div className="d-flex justify-content-center text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};
