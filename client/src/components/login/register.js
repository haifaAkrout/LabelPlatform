import React from 'react';
import './auth.css';
import './register.css';

import logo from './logo_label_blanc.png';

export  default  class register extends React.Component{





    render(){

        return (
           <div className="login-wrap signin_wrap">
        <div className="login-html">
          <a href="/" className="aligncenter">
            <img className="logo_h_91 signin_html_wrap" src={logo} /><br />
          </a>
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign Up</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab" />
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="text-center social-btn">
                <a href="#" className="btn btn-primary btn-block"><i className="fa fa-facebook" /> Sign up with <b>Facebook</b></a>
                <a href="#" className="btn btn-danger btn-block"><i className="fa fa-google" /> Sign up with <b>Google</b></a>
              </div>
              <div className="hr2" />
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="username" className="label">Username or EMail</label>
                  <input id="username" type="text" className="input" />
                </div>
              </div>
              <div className="group row col-12">
                <div className="col-6">
                  <label htmlFor="firstName" className="label">First name</label>
                  <input id="firstName" type="text" className="input" />
                </div>
                <div className="col-6">
                  <label htmlFor="lastName" className="label">Last name</label>
                  <input id="lastName" type="text" className="input" />
                </div>
              </div>
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="FirstName" className="label">Gender</label>
                  <select name="gender" multiple className="input">
                    <option value={0}>Female</option>
                    <option value={0}>Male</option>
                    <option value={0}>Other</option>
                  </select>
                </div>
              </div>
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="naissance" className="label">Naissance</label>
                  <input id="naissance" type="date" className="input" />
                </div>
              </div>
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="password" className="label">Password</label>
                  <input id="password" type="password" className="input" />
                </div>
              </div>
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="cfPassword" className="label">Confirm Password</label>
                  <input id="cfPassword" type="password" className="input" />
                </div>
              </div>
              <div className="group">
                 <button  className="button">Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
        

    }}
