import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {deleteJudge,
} from "../../../store/actions";
import {connect} from "react-redux";
export  default  class listCandidatures extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            Sessions:[],
            NomSession:''
        } ;



    };


    componentDidMount() {
        const {id1}=this.props.match.params
        axios.get('http://localhost:6003/candidatures/'+id1).then(res=>{
            console.log(res.data.Project)
            this.setState({NomSession:res.data.Name});
            this.setState({Sessions:res.data.Project});


        })
    }




    render(){

        return (

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
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
                                                            <div className="media-left"><img src="../../../../public/img/av4.png"
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
                                                            <div className="media-left"><img src="../../../../public/img/av4.png" alt="Profile Picture"
                                                                                             className="img-circle img-sm"/></div>
                                                            <div className="media-body">
                                                                <div className="text-nowrap">Lucy sent you a message</div>
                                                                <small className="text-muted">30 minutes ago</small>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="media">
                                                            <div className="media-left"><img src="../../../../public/img/av3.png" alt="Profile Picture"
                                                                                             className="img-circle img-sm"/></div>
                                                            <div className="media-body">
                                                                <div className="text-nowrap">Jackson sent you a message</div>1
                                                                <small className="text-muted">40 minutes ago</small>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="media">
                                                            <div className="media-left"><img src="../../../../public/img/av6.png" alt="Profile Picture"
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

                <div className="boxed">

                    <div id="content-container">
                        <div className="pageheader hidden-xs">
                            <h3><i className="fa fa-home"></i> Dashboard </h3>
                            <div className="breadcrumb-wrapper">
                                <span className="label">You are here:</span>
                                <ol className="breadcrumb">
                                    <li><a href="#"> Home </a></li>
                                    <li className="active"> Dashboard</li>
                                </ol>
                            </div>
                        </div>


                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">{this.state.NomSession}</h3>
                            </div>
                            <div className="panel-body">
                                <div className="pad-btm form-inline">
                                    <div className="row">
                                        <div className="col-sm-6 text-xs-center">
                                            <div className="form-group">
                                                <label className="control-label"></label>
                                                <select id="demo-foo-filter-status" className="form-control">
                                                    <option value="">Show all</option>
                                                    <option value="positif">Positif</option>
                                                    <option value="negatif">negatif</option>
                                                    <option value="no">Treated</option>
                                                    <option value="non Traités">No treated</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <table id="demo-foo-filtering"
                                       className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                <thead>
                                    <tr>
                                        <th>Type of candidature </th>
                                        <th >Project Name </th>
                                        <th >Lead </th>

                                        <th >Soumission Date </th>
                                        <th> Review Charge </th>

                                        <th>Status</th>
                                        <th> Action </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.Sessions.map(function(d, idx){
                                        if(d.createdBy.Status==='non Traités')
                                        return (

                                            <tr key={idx}>
                                                <td>{d.createdBy.TypeLabel.type}</td>
                                                <td>{d.Name }</td>

                                                <td>{d.members[0].Email}</td>
                                                <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                <td>{d.createdBy.review.type}</td>
                                                <td>{d.createdBy.Status}</td>
                                                 <td>Juger</td>


                                            </tr>
                                        )
                                        else
                                            return (
                                                <tr key={idx}>
                                                    <td>{d.createdBy.TypeLabel.type}</td>
                                                    <td>{d.Name }</td>

                                                    <td>{d.members[0].Email}</td>
                                                    <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                    <td>{d.createdBy.review.type}</td>
                                                    <td>{d.createdBy.Status}</td>
                                                    <td>Consulter</td>

                                                </tr>
                                            )

                                    }.bind(this))}


                                    </tbody>
                                </table>

                            </div>


                    </div>

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
                                               Layouts
                                            </span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="layout-blank.html"><i className="fa fa-caret-right"></i> Blank
                                                        Page </a></li>
                                                    <li><a href="layout-boxed.html"><i className="fa fa-caret-right"></i> Boxed
                                                        Version </a></li>
                                                    <li><a href="layout-collapsed-sidebar.html"><i
                                                        className="fa fa-caret-right"></i> Collapsed Sidebar </a></li>
                                                    <li><a href="layout-push-menu.html"><i
                                                        className="fa fa-caret-right"></i> Push Menu </a></li>
                                                    <li><a href="layout-slide-menu.html"><i
                                                        className="fa fa-caret-right"></i> Slide Menu </a></li>
                                                    <li><a href="layout-horizontal-menu.html"><i
                                                        className="fa fa-caret-right"></i> Horizontal Menu </a></li>
                                                    <li><a href="layout-horizontal-menu-boxed.html"><i
                                                        className="fa fa-caret-right"></i> Boxed Horizontal </a></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-briefcase"></i>
                                                    <span className="menu-title">UI Elements</span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="ui-animation.html"><i className="fa fa-caret-right"></i> CSS3
                                                        Animation </a></li>
                                                    <li><a href="ui-panel.html"><i className="fa fa-caret-right"></i> Panel </a>
                                                    </li>
                                                    <li><a href="ui-xeditable.html"><i
                                                        className="fa fa-caret-right"></i> Xeditable </a></li>
                                                    <li><a href="ui-button.html"><i className="fa fa-caret-right"></i> Buttons
                                                    </a></li>
                                                    <li><a href="ui-fontawesome.html"><i
                                                        className="fa fa-caret-right"></i> Fontawesome </a></li>
                                                    <li><a href="ui-icons.html"><i className="fa fa-caret-right"></i> Icons </a>
                                                    </li>
                                                    <li><a href="ui-components.html"><i
                                                        className="fa fa-caret-right"></i> Components </a></li>
                                                    <li><a href="ui-timeline.html"><i
                                                        className="fa fa-caret-right"></i> Timeline </a></li>
                                                    <li><a href="ui-nested-lists.html"><i
                                                        className="fa fa-caret-right"></i> Nested Lists </a></li>
                                                    <li><a href="ui-grids.html"><i className="fa fa-caret-right"></i> Grids </a>
                                                    </li>
                                                    <li><a href="ui-tab.html"><i className="fa fa-caret-right"></i> Tab </a>
                                                    </li>
                                                    <li><a href="ui-accordions.html"><i
                                                        className="fa fa-caret-right"></i> Accordions </a></li>
                                                    <li><a href="ui-dragdrop.html"><i
                                                        className="fa fa-caret-right"></i> Draggable Panel</a></li>
                                                    <li><a href="ui-typography.html"><i
                                                        className="fa fa-caret-right"></i> Typography </a></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-file"></i>
                                                    <span className="menu-title">Pages</span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="pages-faq.html"><i className="fa fa-caret-right"></i> FAQ </a>
                                                    </li>
                                                    <li><a href="pages-gallery.html"><i
                                                        className="fa fa-caret-right"></i> Gallery </a></li>
                                                    <li><a href="pages-directory.html"><i
                                                        className="fa fa-caret-right"></i> Directory </a></li>
                                                    <li><a href="pages-profile.html"><i className="fa fa-caret-right"></i> User
                                                        Profile </a></li>
                                                    <li><a href="pages-invoice.html"><i
                                                        className="fa fa-caret-right"></i> Invoice </a></li>
                                                    <li><a href="pages-login.html"><i className="fa fa-caret-right"></i> Login
                                                    </a></li>
                                                    <li><a href="pages-register.html"><i
                                                        className="fa fa-caret-right"></i> Register </a></li>
                                                    <li><a href="pages-password-reminder.html"><i
                                                        className="fa fa-caret-right"></i> Password Reminder </a></li>
                                                    <li><a href="pages-lock-screen.html"><i
                                                        className="fa fa-caret-right"></i> Lock Screen </a></li>
                                                    <li><a href="pages-404.html"><i className="fa fa-caret-right"></i> 404 Error
                                                    </a></li>
                                                    <li><a href="pages-500.html"><i className="fa fa-caret-right"></i> 500 Error
                                                    </a></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-table"></i>
                                                    <span className="menu-title">Tables</span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="table-static.html"><i className="fa fa-caret-right"></i> Static
                                                        Table <span className="label label-info pull-right">New</span></a></li>
                                                    <li><a href="table-datatable.html"><i
                                                        className="fa fa-caret-right"></i> Datatable Table </a></li>
                                                    <li><a href="table-footable.html"><i
                                                        className="fa fa-caret-right"></i> Footable Table </a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-edit"></i>
                                                    <span className="menu-title">Forms</span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="forms-layout.html"><i className="fa fa-caret-right"></i> Form
                                                        Layout </a></li>
                                                    <li><a href="forms-switchery.html"><i
                                                        className="fa fa-caret-right"></i> Form Switchery </a></li>
                                                    <li><a href="forms-components.html"><i
                                                        className="fa fa-caret-right"></i> Form Components </a></li>
                                                    <li><a href="forms-validation.html"><i
                                                        className="fa fa-caret-right"></i> Form Validation </a></li>
                                                    <li><a href="forms-wizard.html"><i className="fa fa-caret-right"></i> Form
                                                        Wizard </a></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-line-chart"></i>
                                                    <span className="menu-title">Charts</span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="charts-flot.html"><i className="fa fa-caret-right"></i> Flot
                                                        Chart </a></li>
                                                    <li><a href="charts-morris.html"><i
                                                        className="fa fa-caret-right"></i> Morris Chart </a></li>
                                                </ul>
                                            </li>
                                            <li className="list-divider"></li>

                                            <li className="list-header">Extra</li>

                                            <li>
                                                <a href="calendar.html">
                                                    <i className="fa fa-calendar"></i>
                                                    <span className="menu-title">
                                            Calendar
                                            </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="ui-widgets.html">
                                                    <i className="fa fa-flask"></i>
                                                    <span className="menu-title">
                                               Widgets
                                            <span className="label label-pink pull-right">New</span>
                                            </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-envelope-o"></i>
                                                    <span className="menu-title">Mail</span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="mail-inbox.html"><i className="fa fa-caret-right"></i> Inbox
                                                    </a></li>
                                                    <li><a href="mail-compose.html"><i
                                                        className="fa fa-caret-right"></i> Compose </a></li>
                                                    <li><a href="mail-mailview.html"><i className="fa fa-caret-right"></i> Mail
                                                        View </a></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-map-marker"></i>
                                                    <span className="menu-title">
                                            Maps
                                            <span className="label label-mint pull-right">New</span>
                                            </span>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="maps-gmap.html">Google Maps</a></li>
                                                    <li><a href="maps-vectormap.html">Vector Maps</a></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-plus-square"></i>
                                                    <span className="menu-title">Menu Level</span>
                                                    <i className="arrow"></i>
                                                </a>

                                                <ul className="collapse">
                                                    <li><a href="#"><i className="fa fa-caret-right"></i> Second Level Item</a>
                                                    </li>
                                                    <li><a href="#"><i className="fa fa-caret-right"></i> Second Level Item</a>
                                                    </li>
                                                    <li><a href="#"><i className="fa fa-caret-right"></i> Second Level Item</a>
                                                    </li>
                                                    <li className="list-divider"></li>
                                                    <li>
                                                        <a href="#">Third Level<i className="arrow"></i></a>

                                                        <ul className="collapse">
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Third Level<i className="arrow"></i></a>

                                                        <ul className="collapse">
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                            <li className="list-divider"></li>
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                            <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                Item</a></li>
                                                        </ul>
                                                    </li>
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

                </div>

            </div>

            </div>




        )
    }
}
