


import React from 'react';


class Nav extends React.Component {
    render() {
        return (

            <nav id="mainnav-container">

                <div className="navbar-header">
                    <a href="index.html" className="navbar-brand">
                        <i className="fa fa-forumbee brand-icon"></i>
                        <div className="brand-title">
                            <span className="brand-text">WOW</span>
                        </div>
                    </a>
                </div>

                <div id="mainnav">


                    <div id="mainnav-menu-wrap">
                        <div className="nano">
                            <div className="nano-content">
                                <ul id="mainnav-menu" className="list-group">

                                    <li className="list-header">Navigation</li>

                                    <li><a href="index.html"> <i className="fa fa-home"></i> <span
                                        className="menu-title"> Dashboard </span> </a></li>

                                    <li className="list-header">Components</li>



                                    <li>
                                        <a href="#">
                                            <i className="fa fa-th"></i>
                                            <span className="menu-title">
                                               Judges Management
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">
                                            <li><a href="http://localhost:3000/Judges/sendEmail"><i className="fa fa-caret-right"></i>
                                                Add Judge  </a></li>
                                            <li><a href="http://localhost:3000/judges/demandes"><i className="fa fa-caret-right"></i>
                                                Show Judges  </a></li>



                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-th"></i>
                                            <span className="menu-title">
                                             Demands
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">
                                            <li><a href=""><i className="fa fa-caret-right"></i>
                                                Add Judge  </a></li>
                                            <li><a href="layout-boxed.html"><i className="fa fa-caret-right"></i>
                                                Delete Judge  </a></li>
                                            <li><a href="layout-collapsed-sidebar.html"><i
                                                className="fa fa-caret-right"></i> show Judges </a></li>


                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-th"></i>
                                            <span className="menu-title">
                                              Labeling startups
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">
                                            <li><a href=""><i className="fa fa-caret-right"></i>
                                                Add Judge  </a></li>
                                            <li><a href="layout-boxed.html"><i className="fa fa-caret-right"></i>
                                                Delete Judge  </a></li>
                                            <li><a href="layout-collapsed-sidebar.html"><i
                                                className="fa fa-caret-right"></i> show Judges </a></li>


                                        </ul>
                                    </li>

                                    <li>
                                        <a href="#">
                                            <i className="fa fa-th"></i>
                                            <span className="menu-title">
                                              Labeling startups
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">
                                            <li><a href=""><i className="fa fa-caret-right"></i>
                                                Add Judge  </a></li>
                                            <li><a href="layout-boxed.html"><i className="fa fa-caret-right"></i>
                                                Delete Judge  </a></li>
                                            <li><a href="layout-collapsed-sidebar.html"><i
                                                className="fa fa-caret-right"></i> show Judges </a></li>


                                        </ul>
                                    </li>











                                </ul>

                                <div className="mainnav-widget">

                                    <div className="show-small">
                                        <a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
                                            <i className="fa fa-desktop"></i>
                                        </a>
                                    </div>

                                    <div id="demo-wg-server" className="hide-small mainnav-widget-content">
                                        <ul className="list-group">
                                            <li className="list-header pad-no pad-ver">Server Status</li>
                                            <li className="mar-btm">
                                                <span className="label label-primary pull-right">15%</span>
                                                <p>CPU Usage</p>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar progress-bar-primary"
                                                         style={{width: 15}}>
                                                        <span className="sr-only">15%</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mar-btm">
                                                <span className="label label-purple pull-right">75%</span>
                                                <p>Bandwidth</p>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar progress-bar-purple"
                                                         style={{width: 75}}>
                                                        <span className="sr-only">75%</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </nav>




        );
    }
}


export default Nav;