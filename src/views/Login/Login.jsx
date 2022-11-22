import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import "./styles.css";
const Login = () => {
    // const signUpButton = document.getElementById("signUp");
    // const signInButton = document.getElementById("signIn");
    // const container = document.getElementById("container-login");
    const [classPanel, setClassPanel] = useState('container-login')
    // signUpButton.addEventListener("click", () => {
    //     container.classList.add("right-panel-active");
    // });

    // signInButton.addEventListener("click", () => {
    //     container.classList.remove("right-panel-active");
    // });

    const addClass = ()=>{
        setClassPanel("container-login right-panel-active")
    }
    const removeClass = ()=>{
        setClassPanel("container-login")
    }


    const [dataLogin, setDataLogin] = useState([]);
    let navigate = useNavigate();
    const onChange = (e)=>{
        e.preventDefault()
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    }
    const onSubmit = async (e)=>{
        e.preventDefault()

        if(dataLogin.length === 0 || dataLogin.identifier==="" || dataLogin.password ===""){
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Por favor Llene los campos!',
              })
        }else{
                     
            const settings = {
                method: 'POST',
                body:JSON.stringify(dataLogin),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            try {
                const fetchResponse = await fetch(`https://blog-strapi-production.up.railway.app/api/auth/local`, settings);
                const data = await fetchResponse.json();
                
                console.log(data)
                if(data?.error?.status === 400){
                    Swal.fire({
                        icon: 'error',
                        title: '',
                        text: 'Datos incorrectos!',
                      }) 
                      return 
                }else{
                    localStorage.setItem('token', data.jwt)
                    localStorage.setItem('user', JSON.stringify(data.user))
                    return navigate("/");
                }
            } catch (e) {
                console.log(e)
                return e
            } 
        }
    }
    return (
        <>
            {/* <Header /> */}
            <div className="container d-flex justify-content-center">
                <div className={classPanel} id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1 className="titulo-h1">Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-google-plus-g"></i>
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                            <span>usa tu email para registrarte</span>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button>Registrarme</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={onSubmit} onChange={onChange}>
                            <h1 className="titulo-h1" >Login</h1>
                            <div className="social-container">
                                <a href="#" className="social">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-google-plus-g"></i>
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                            <span>usa una cuenta existente</span>
                            <input type="email" name="identifier" placeholder="Email" />
                            <input type="password" name="password" placeholder="Password" />
                            {/* <a href="#">Forgot your password?</a> */}
                            <button className="mt-3
                            ">Entrar</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="titulo-h1">Bienvenido!</h1>
                                <p>
                                    Deseas crear tu primer post, por favor inicia sesion
                                </p>
                                <button className="ghost" id="signIn" onClick={removeClass}>
                                    Login
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="titulo-h1">Hola, Amigos!</h1>
                                <p>
                                    Introduce tu datos personales para empezar
                                    con los posts
                                </p>
                                <button className="ghost" id="signUp" onClick={addClass}>
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
