import React from "react";
import "./Usercontrol.css";
import { NavLink } from "react-router-dom";
export default function Login() {
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
                <form id="kc-form-login">
                  <div className="form-group">
                    <label
                      for="userName"
                      className="pf-c-form__label pf-c-form__label-text"
                    >
                      Username or email
                    </label>
                    <input
                      tabindex="1"
                      type="text"
                      id="userName"
                      className="pf-c-form-control"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      for="password"
                      className="pf-c-form__label pf-c-form__label-text"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      tabindex="2"
                      name="password"
                      id="password"
                      className="pf-c-form-control"
                    />
                  </div>
                  <div className="form-group login-pf-setting">
                    <div id="kc-form-options">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            tabindex="3"
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
                      tabindex="4"
                      className="pf-c-button pf-m-primary pf-m-block btn-lg"
                      name="login"
                      id="kc-login"
                      type="submit"
                      value="Sign in"
                    />
                  </div>
                </form>
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
