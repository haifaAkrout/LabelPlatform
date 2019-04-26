

import React from 'react';


class Header extends React.Component {


        //this.setState({username: localStorage.user_firstName})
    render() {

        return (
            < header
                id = "navbar" >
                < div
                    id = "navbar-container"
                    className = "boxed" >

                    < div
                        className = "navbar-content clearfix" >
                        < ul
                            className = "nav navbar-top-links pull-left" >

                            < li
                                className = "tgl-menu-btn" >
                                < a
                                    className = "mainnav-toggle"
                                    href = "#" > < i
                                    className = "fa fa-navicon fa-lg" > </i>
                                </a >
                            </li>

                         
                          
                        </ul>
                        <ul className="nav navbar-top-links pull-right">

                         

                            <li id="dropdown-user" className="dropdown">
                                <a href="/profile"  className="dropdown-toggle text-right">
                    <span className="pull-right"> <img className="img-circle img-user media-object"
                                                       src="/img/av1.png" alt="Profile Picture"/> </span>
                                    <div className="username hidden-xs">{localStorage.user_fistname} {localStorage.user_lastname}</div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right with-arrow">

                                    <ul className="head-list">
                                        <li>
                                            <a href="#"> <i className="fa fa-user fa-fw"></i> Profile </a>
                                        </li>
                                        <li>
                                            <a href="#"> <i className="fa fa-envelope fa-fw"></i> Messages </a>
                                        </li>
                                        <li>
                                            <a href="#"> <i className="fa fa-gear fa-fw"></i> Settings </a>
                                        </li>
                                        <li>
                                            <a href="#"> <i className="fa fa-sign-out fa-fw"></i> Logout </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </div>

                </div>
            </header>
        );
    }
}


export default Header;