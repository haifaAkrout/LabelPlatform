import React from 'react';

export  default  class login extends React.Component{





    render(){

        return (
            <div id="container">

                <div className="lock-wrapper">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="lock-box">
                                <div className="main">
                                    <h3>Please Log In, or <a href="#">Sign Up</a></h3>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <a href="#" className="btn btn-lg btn-primary btn-block">Facebook</a>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <a href="#" className="btn btn-lg btn-info btn-block">Google</a>
                                        </div>
                                    </div>
                                    <div className="login-or">

                                    </div>

                                        <div className="form-group">
                                            <label htmlFor="inputUsernameEmail">Username or email</label>
                                            <input type="text" className="form-control" id="inputUsernameEmail"/>
                                        </div>
                                        <div className="form-group">
                                            <a className="pull-right" href="#">Forgot password?</a>
                                            <label htmlFor="inputPassword">Password</label>
                                            <input type="password" className="form-control" id="inputPassword"/>
                                        </div>
                                        <div className="pull-left pad-btm">
                                            <div className="checkbox">
                                                <label className="form-checkbox form-icon form-text">

                                                </label>
                                            </div>
                                        </div>
                                        <a href="http://localhost:3000/Dashboard" >  <button type="submit" className="btn btn-block btn-primary">
                                            Sign In
                                        </button></a>


                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
)

}}
