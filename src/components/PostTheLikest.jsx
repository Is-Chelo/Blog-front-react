import React from "react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import "./styles.css";
import Swal from "sweetalert2";
const PostTheLikest = ({
    titulo = "Aprende a Usar Word",
    categoria = "Word",
    descripcion = `Aprenderas todas las caracteristicas de
    word basico y word avanzado`,
    creado,
    id,
    imagen,
    button,
}) => {
    const deletePost = (id) => {
        const token = localStorage.getItem('token')
        console.log(token)
        try {
            Swal.fire({
                title: "Estas seguro de eliminar este post?",
                text: "Recuerde que no podra volvera a recuperarlo!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si,Eliminar !",
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                      const respuesta = await fetch(`https://blog-strapi-production.up.railway.app/api/posts/${id}`,{
                        method:'DELETE',
                        Authorization: `Bearer ${token}`,
                      })
                      const data = await respuesta.json()
                      console.log(data)
                      if(!data?.error){
                        Swal.fire(
                            'Eliminado!',
                            'El post fue eliminado.',
                            'success'
                          )
                      }
                   
                } else if (result.isDenied) {
                    return;
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col-xs-12 col-md-7 col-lg-7">
                    {button ? (
                        <a className="btn" onClick={() => deletePost(id)}>
                            ✖
                        </a>
                    ) : (
                        ""
                    )}

                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 color-naranja">
                            {categoria}
                        </strong>
                        <h3 className="mb-0">{titulo}</h3>
                        <div className="mb-3 text-muted">
                            {moment(creado).format("YYYY-MM-DD")}
                        </div>
                        <p className="card-text mb-auto">{descripcion}</p>
                        <Link to={`/simple-post/${id}`}>Continuar Leyendo</Link>
                    </div>
                </div>
                <div className="col-xs-12 col-md-5 col-lg-5 d-flex align-items-center">
                    <div className="d-none d-lg-block">
                        <img
                            src={imagen}
                            width="100%"
                            className="imagen-post"
                        ></img>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostTheLikest;
