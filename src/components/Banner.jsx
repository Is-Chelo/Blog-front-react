
import '../App.css'
const banner = ({
    titulo = "Blog Sistemas Computaciones",
    imagen,
    descripcion = "En este blog podras encontrar guias tecnologicas",
}) => {
    return (
        <>
            <main>
                <div >
                    <img  className="imagen-banner" src={imagen} />
                </div>
                <div className="position-relative overflow-hidden text-center bg-fondo p-lg-5">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-5 fw-normal color-letra-baner ">{titulo}</h1>
                        <span className="linea d-xs-none"></span>
                        <p className="lead fw-normal mt-5 color-letra-baner">{descripcion}</p>
                        <a
                            className="btn btn-outline-secondary color-letra-baner"
                            data-aos="zoom-in"
                            data-aos-easing="linear"
                            data-aos-duration="1500"
                            href="#"
                            
                        >
                            Comencemos
                        </a>
                    </div>
                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>
            </main>
        </>
    );
};

export default banner;
