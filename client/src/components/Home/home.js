import React from 'react';

import './home.css';

import logo from './logo_label_blanc.png';


export default class home extends React.Component{


    render(){

        return (

      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <div className="masthead clearfix">
              <div className="inner">
                <h3 className="masthead-brand"> 
                  <img className="logo_h_91" src={logo} /><br /> </h3>
                <nav className="nav nav-masthead">
                  <a href="/login" type="button" className="btn btn-lg btn-default btn-notify top_30 login_btn">My Startup Label</a>
                </nav>
              </div>
            </div>
            <br />
            <div className="inner cover">
              <h1 className="cover-heading">The Startup platform</h1>
              <h5 className="sub-header">We Bring Good Things to Life</h5>
              <br />
              <p className="lead cover-copy">
                The startups platform aims to become a "one stop shop" for startups in the country.</p>
              <p className="lead">
                <a href="/register" type="button" className="btn btn-lg btn-default btn-notify sign_in_btn">Start Your Own Label now</a>
              </p>
            </div>
            <div className="mastfoot">
              <div className="inner">
                <p>© Tweenz. Design Made By Love.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  

}}
