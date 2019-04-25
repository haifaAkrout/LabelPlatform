

import React from 'react';


class Header2 extends React.Component {
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
                        < ul
                            className = "nav navbar-top-links right" >

                                <li className="col-sm-3 col-xs-4">
                                    <a href="index-2.html" className="logo">Labelling Platform</a>
                                </li>

                                            <li className="current"><a href="#home">Home</a>

                                            </li>
                                            <li><a href="#about">About</a></li>
                                            <li><a href="#features">Apply</a></li>


                                            <li><a href="#contact">Contact</a></li>
                                            <li><a href="#services">Sign in </a></li>



                        </ul>

                    </div>

                </div>
            </header>
        );
    }
}


export default Header2;