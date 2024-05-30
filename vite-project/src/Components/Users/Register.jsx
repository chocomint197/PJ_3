import React from "react";
import "./Usercontrol.css";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate();
  const registerSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'), 
    password: Yup.string().required('Password is required'), 
    email: Yup.string().email('Invalid email').required('Email is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),

  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`https://pj-3-ug2p.onrender.com/api/v1/users/signup`, values);
      alert('Register success')
      navigate('/user/login')
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="login-pf-page register-page">
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
          <div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 subtitle">
              <span className="subtitle">
                <span className="required">*</span>
                Required fields
              </span>
            </div>
            <div className="col-md-10">
              <h1 id="kc-page-title">Register</h1>
            </div>

            
          </div>
          
        </header>
        <div id="kc-content">
          <div id="kc-content-wrapper">
            <div id="kc-form">
              <div id="kc-form-wrapper">
              <Formik
    initialValues={{
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
    }}
    validationSchema={registerSchema}
    onSubmit={handleSubmit}

  >
    {({ isSubmitting }) => (
      <Form id="kc-register-form" className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <label
            htmlFor="userName"
            className="pf-c-form__label pf-c-form__label-text"
          >
            Username <span className="required">*</span>
          </label>
          </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Field
      type="text"
     id="userName"
      name="userName" 
      className="pf-c-form-control"
     autoComplete="userName"
  />
    <ErrorMessage name="userName" component="div" className="error-message" />
        </div>
         

        </div>
        <div className="form-group">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <label
            htmlFor="password"
            className="pf-c-form__label pf-c-form__label-text"
          >
            Password <span className="required">*</span>
          </label>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Field
    type="password"
    tabIndex="2"
    name="password"
    id="password"
    className="pf-c-form-control"
  />
  <ErrorMessage name="password" component="div" className="error-message" />
          </div>
         
        
        </div>
        <div className="form-group">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <label
            htmlFor="confirmPassword"
            className="pf-c-form__label pf-c-form__label-text"
          >
            Confirm password <span className="required">*</span>
          </label>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Field
    type="password"
    tabIndex="2"
    name="confirmPassword"
    id="confirmPassword"
    className="pf-c-form-control"
  />
  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          </div>
         
        
        </div>
        <div className="form-group">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <label
            htmlFor="email"
            className="pf-c-form__label pf-c-form__label-text"
          >
            Email <span className="required">*</span>
          </label>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Field
    type="text"
    tabIndex="2"
    name="email"
    id="email"
    className="pf-c-form-control"
  />
  <ErrorMessage name="email" component="div" className="error-message" />
          </div>
         
        
        </div>
      <div className="form-group">
      <div id="kc-form-option" className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{marginTop: '20px'}}>
        <div>
          <span>
            <NavLink to={'/user/login'}>« Back to Login</NavLink>
          </span>
        </div>
      </div>
        <div id="kc-form-buttons" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
            value="Register"
            disabled={isSubmitting}
          />
        </div>
        </div>
      </Form>
     )}
  </Formik>
              </div>
              
            </div>
       
          </div>
        </div>
      </div>
    </div>
  );
}
