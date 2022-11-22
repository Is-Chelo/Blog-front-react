import React, { useEffect, useState } from "react";

const CategoryPost = () => {
    const [dataCategories, setDataCategories] = useState([]);

    const getCategories = async () => {
        const response = await fetch(
            ` https://blog-strapi-production.up.railway.app/api/categories`
        );
        const { data } = await response.json();
        setDataCategories(data);
    };
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="">
            <div className="position-sticky">
                <div className="p-4 mb-3 bg-light rounded">
                    <h4 className="fst-italic">Sobre Mi</h4>
                    <p className="mb-0">
                        Mi nombre es Carlos Marcelo Torres Vargas
                    </p>
                    <p>
                        Soy estudiante de la carrera de Sistemas computacionales
                        del nivel Auxiliar.
                    </p>
                </div>
                {/* <img
                                data-aos="fade-up"
                                src="img/logo.png"
                                alt=""
                                width="300px"
                                height="300px"
                            ></img> */}
                <div className="p-4">
                    <h4 className="fst-italic">Categorias</h4>
                    <ol className="list-unstyled mb-0">
                        {dataCategories.map((dato) => {
                            return (
                                <li>
                                    <a href="#">{dato.attributes.nombre}</a>
                                </li>
                            );
                        })}
                        
                    </ol>
                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Mis Redes Sociales</h4>
                    <ol className="list-unstyled" data-aos="fade-up">
                        <li>
                            <a href="#">Whatsapp</a>
                        </li>
                        <li>
                            <a href="#">Twitter</a>
                        </li>
                        <li>
                            <a href="#">Facebook</a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default CategoryPost;
