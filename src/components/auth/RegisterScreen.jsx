import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
// import { register } from "../../actions/auth";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Hernando",
    email: "nando@gmail.com",
    password: "123456",
    password2: "123456",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));

      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));

      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(
        setError(
          "password should be at least 6 characters and match each other"
        )
      );

      return false;
    }
    dispatch(removeError());

    return true;
  };

  const { name, email, password, password2 } = formValues;

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          className="auth__input"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          className="auth__input"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth__input"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="auth__input"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="login" className="link">
          Already registered ?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
