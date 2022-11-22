import React from "react";
import "./styles.css";
const CategoryHome = ({ nombre, descripcion, creado }) => {
    return <button className="btn boton-categoria" style={{ background: "#FF4B2B", color:"white"}}>{nombre}</button>;
};

export default CategoryHome;
