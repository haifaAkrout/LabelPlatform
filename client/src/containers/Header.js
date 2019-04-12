

import React from 'react';


class Header extends React.Component {
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

                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle"> <i className="fa fa-envelope fa-lg"></i>
                                    <span className="badge badge-header badge-warning">9</span>
                                </a>

                                <div className="dropdown-menu dropdown-menu-md with-arrow">
                                    <div className="pad-all bord-btm">
                                        <div className="h4 text-muted text-thin mar-no">You have 3 messages.</div>
                                    </div>
                                    <div className="nano scrollable">
                                        <div className="nano-content">
                                            <ul className="head-list">


                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><img src="img/av4.png"
                                                                                         alt="Profile Picture"
                                                                                         className="img-circle img-sm"/></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Andy sent you a message</div>
                                                            <small className="text-muted">15 minutes ago</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><img src="../../public/img/av4.png" alt="Profile Picture"
                                                                                         className="img-circle img-sm"/></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Lucy sent you a message</div>
                                                            <small className="text-muted">30 minutes ago</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><img src="../../public/img/av3.png" alt="Profile Picture"
                                                                                         className="img-circle img-sm"/></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Jackson sent you a message</div>1
                                                            <small className="text-muted">40 minutes ago</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><img src="../../public/img/av6.png" alt="Profile Picture"
                                                                                         className="img-circle img-sm"/></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Donna sent you a message</div>
                                                            <small className="text-muted">5 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><img src="img/av4.png" alt="Profile Picture"
                                                                                         className="img-circle img-sm"/></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Lucy sent you a message</div>
                                                            <small className="text-muted">Yesterday</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><img src="img/av3.png" alt="Profile Picture"
                                                                                         className="img-circle img-sm"/></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Jackson sent you a message</div>
                                                            <small className="text-muted">Yesterday</small>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="pad-all bord-top">
                                        <a href="#" className="btn-link text-dark box-block"> <i
                                            className="fa fa-angle-right fa-lg pull-right"></i>Show All Messages </a>
                                    </div>
                                </div>
                            </li>

                            <li className="dropdown">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle"> <i className="fa fa-bell fa-lg"></i> <span
                                    className="badge badge-header badge-danger">5</span> </a>

                                <div className="dropdown-menu dropdown-menu-md with-arrow">
                                    <div className="pad-all bord-btm">
                                        <div className="h4 text-muted text-thin mar-no"> Notification</div>
                                    </div>
                                    <div className="nano scrollable">
                                        <div className="nano-content">
                                            <ul className="head-list">

                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><span className="icon-wrap icon-circle bg-primary"> <i
                                                            className="fa fa-comment fa-lg"></i> </span></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">New comments waiting approval</div>
                                                            <small className="text-muted">15 minutes ago</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <span className="badge badge-success pull-right">90%</span>
                                                        <div className="media-left"><span className="icon-wrap icon-circle bg-danger"> <i
                                                            className="fa fa-hdd-o fa-lg"></i> </span></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">HDD is full</div>
                                                            <small className="text-muted">50 minutes ago</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><span className="icon-wrap icon-circle bg-info"> <i
                                                            className="fa fa-file-word-o fa-lg"></i> </span></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Write a news article</div>
                                                            <small className="text-muted">Last Update 8 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <span className="label label-danger pull-right">New</span>
                                                        <div className="media-left"><span className="icon-wrap icon-circle bg-purple"> <i
                                                            className="fa fa-comment fa-lg"></i> </span></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">Comment Sorting</div>
                                                            <small className="text-muted">Last Update 8 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#" className="media">
                                                        <div className="media-left"><span className="icon-wrap icon-circle bg-success"> <i
                                                            className="fa fa-user fa-lg"></i> </span></div>
                                                        <div className="media-body">
                                                            <div className="text-nowrap">New User Registered</div>
                                                            <small className="text-muted">4 minutes ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="pad-all bord-top">
                                        <a href="#" className="btn-link text-dark box-block"> <i
                                            className="fa fa-angle-right fa-lg pull-right"></i>Show All Notifications </a>
                                    </div>
                                </div>
                            </li>

                        </ul>
                        <ul className="nav navbar-top-links pull-right">

                            <li className="hidden-xs" id="toggleFullscreen">
                                <a className="fa fa-expand" data-toggle="fullscreen" href="#" role="button">
                                    <span className="sr-only">Toggle fullscreen</span>
                                </a>
                            </li>

                            <li id="dropdown-user" className="dropdown">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle text-right">
                    <span className="pull-right"> <img className="img-circle img-user media-object"
                                                       src="/img/av1.png" alt="Profile Picture"/> </span>
                                    <div className="username hidden-xs">Akrout Haifa</div>
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