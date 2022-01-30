import React from "react";
import { useState, useContext } from "react";
import { login } from "../../context/authContext/ApiCall";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

  const FormButton = (props) => (
    <div id="button" class="row">
      <button type={props.type} onClick={props.onClick} onSubmit={props.onSubmit} disabled={props.disabled}>
        {props.title}
      </button>
    </div>
  );

  return (
    <div id="loginform">
      <style>{`body { background: rgb(34, 193, 195);
                        background: linear-gradient(135deg, rgb(241, 147, 23) 0%, rgb(10, 236, 236) 100%);
                        font-family: "work sans";
                        height: 100vh; }`}</style>
      <FormHeader title="Login" />

      <div class="row">
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div class="row">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <FormButton type="submit" title="Log in" onClick={handleLogin}  disabled={isFetching} />
    </div>
  );
}
