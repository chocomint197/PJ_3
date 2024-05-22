import React from "react";
import "./Usercontrol.css";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const loginSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'), 
    password: Yup.string().required('Password is required'), 
  });
  return (
    <div className="login-pf-page">
      <div id="kc-header" className="login-pf-page-header">
        <div id="kc-header-wrapper">
          <NavLink to={"/"} style={{ height: "100%" }}>
            <div className="kc-logo-text">
              <span id="md-logo"></span>
              <span id="md-wordmark">MangaDex</span>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="card-pf">
        <header className="login-pf-header">
          <h1 id="kc-page-title">Sign in to your account</h1>
        </header>
        <div id="kc-content">
          <div id="kc-content-wrapper">
            <div id="kc-form">
              <div id="kc-form-wrapper">
              <Formik
    initialValues={{
      userName: "",
      password: "",
    }}
    validationSchema={loginSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form id="kc-form-login">
        <div className="form-group">
          <label
            htmlFor="userName"
            className="pf-c-form__label pf-c-form__label-text"
          >
            Username or email
          </label>
          <Field
     tabIndex="1"
      type="text"
     id="userName"
      name="userName" 
      className="pf-c-form-control"
     autoComplete="off"
  />
    <ErrorMessage name="userName" component="div" className="error-message" />

        </div>
        <div className="form-group">
          <label
            htmlFor="password"
            className="pf-c-form__label pf-c-form__label-text"
          >
            Password
          </label>
          <Field
    type="password"
    tabIndex="2"
    name="password"
    id="password"
    className="pf-c-form-control"
  />
  <ErrorMessage name="password" component="div" className="error-message" />
        </div>
        <div className="form-group login-pf-setting">
          <div id="kc-form-options">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  tabIndex="3"
                  id="rememberMe"
                  name="rememberMe"
                />
                Remember me
              </label>
            </div>
          </div>
          <div>
            <span>
              <NavLink to={"/"}>Forgot Password?</NavLink>
            </span>
          </div>
        </div>
        <div id="kc-form-buttons" className="form-group">
          <input
            type="hidden"
            id="id-hidden-input"
            name="credentialId"
          />
          <input
            tabIndex="4"
            className="pf-c-button pf-m-primary pf-m-block btn-lg"
            name="login"
            id="kc-login"
            type="submit"
            value="Sign in"
          />
        </div>
      </Form>
     )}
  </Formik>
              </div>
              
            </div>
            <form id="kc-select-try-another-way-form" method="POST">
              <div className="form-group">
                <input type="hidden" name="tryAnotherWay" value="on" />
                <NavLink to={"/"} id="try-another-way">
                  Try Another Way
                </NavLink>
              </div>
            </form>
            <div id="kc-info" className="login-pf-signup">
              <div id="kc-info-wrapper">
                <div id="kc-registration-container">
                  <div id="kc-registration">
                    <span>
                      New user ?{" "}
                      <NavLink to={"/user/register"}>Register</NavLink>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
