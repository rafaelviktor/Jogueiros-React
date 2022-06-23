import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import Logo from "../assets/logo.jpg";
import Footer from "./Footer";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
  });

  const { user_email, user_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { user_email, user_password };
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logado com sucesso");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <section
        className="societys text-start">
        <div className="container">
          <form id="form-auth" className="shadow p-5 border mt-5 rounded-3" onSubmit={onSubmitForm} >
            <i className="bi bi-apple"></i>
            <Link to="/">
              <img
                className="navbar-brand mt-4"
                alt="logomarca"
                src={Logo}
                style={{
                  height: 66,
                  marginBottom: 40,
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Link>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                E-Mail
              </label>
              <input
                type="text"
                name="user_email"
                value={user_email}
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Senha
              </label>
              <input
                type="password"
                name="user_password"
                value={user_password}
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
              id="btn-center"
            >
              Entrar
            </button>
          </form>
          <p className="text-center" style={{ marginTop: 15, marginBottom: -7 }}>
            Não possui uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
