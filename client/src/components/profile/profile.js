import React from 'react';
import Nav1 from '../../containers/Nav1.js';
import Header from '../../containers/Header.js';
import ContentContainer from '../../containers/ContentContainer';
import Nav from '../../containers/Nav.js';
import './profile.css';

import { Redirect } from 'react-router-dom'


export default class profile extends React.Component{


    render(){
       if(!localStorage.user_id)
        return <Redirect to='/login' />

         return (
            <div id = "container"   className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
             <Header/>

                <div className="boxed">

 <div className="boxed">
        {/*CONTENT CONTAINER*/}
        {/*===================================================*/}
        <div id="content-container">
          <div className="pageheader hidden-xs">
            <br/>
            <div className="breadcrumb-wrapper">
              <span className="label">You are here:</span>
              <ol className="breadcrumb">
                <li> <a href="/"> Home </a> </li>
                <li className="active"> User Profile </li>
              </ol>
            </div>
          </div>
          {/*Page content*/}
          {/*===================================================*/}
          <div id="page-content">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div className="userWidget-1">
                  <div className="avatar bg-info">
                    <img src="img/av1.png" alt="avatar" />
                    <div className="name osLight td"> {localStorage.user_fistname} {localStorage.user_lastname} </div>
                  </div>
                  <div className="title"> Username/Email : {localStorage.user_email} </div>
                  <ul className="fullstats">
                   
                  </ul>
                  <div className="clearfix"> </div>
                </div>
              
                <div className="panel">
                  <div className="panel-heading">
                    <h4 className="panel-title td"> <i className="fa fa-users" /> My Team membre </h4>
                  </div>
                  <div className="panel-body">
                   <ul className="list-inline">
                      <li>
                        <a href="#AddTeam" className="pull-left avatar">
                          <button  className="button label label-sm label-info" >Add Team membre</button>
                        </a>
                      </li>
                      </ul>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-heading">
                    <h4 className="panel-title td"> <i className="fa fa-address-book-o" /> Statut </h4>
                  </div>
                  <div className="panel-body">
                   <ul className="list-inline">
                      <li>
                        <a href="#AddTeam" className="pull-left avatar">
                          <button  className="button label label-sm label-info" >Candidat</button>
                        </a>
                      </li>
                      </ul>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">
                    <h3 className="panel-title"><i className="fa fa-user"> </i> User Information</h3>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                       
                        <tr className="td">
                     
                          <td className="td"><a href="/update/profile" className="label label-sm label-info" style={{backgroundColor: '#8BC34A'}}>Update my account</a></td>
                        </tr><br/>

                       

                        <tr className="td">
                   
                          <td className="td"><a href="/disable/profile"  className="label label-sm label-info" style={{backgroundColor: 'red'}}>Remove my candidature</a></td>
                        </tr>
                     
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                <div className="panel">
                  <div className="panel-body pad-no">
                    {/*Default Tabs (Left Aligned)*/} 
                    {/*===================================================*/}
                    <div className="tab-base">
                      {/*Nav Tabs*/}
                      <ul className="nav nav-tabs">
                        
                        <li className="active"> <a data-toggle="tab" href="#demo-lft-tab-2">Sessions</a> </li>
                        
                      </ul>
                      {/*Tabs Content*/}
                      <div className="tab-content">
                      
                        <div id="demo-lft-tab-2" className="tab-pane fade active in">
                        <p className="td">There is no session applied, if you wanna apply in session, go to Dashboard and then look to list of session enabled!</p>
                          {/*Hover Rows*/}
                          {/*===================================================*/}
                          <table className="table table-hover table-vcenter">
                          
                   
                          <span className="label label-sm label-info" >Apply in session now</span>
                       
                     
                          </table>
                          {/*===================================================*/}
                          {/*End Hover Rows*/}
                        </div>
                        <div id="demo-lft-tab-3" className="tab-pane fade">
                          {/*Chat widget*/}
                          {/*===================================================*/}
                          <div id="demo-chat-body" className="collapse in">
                            <div className="nano" style={{height: '550px'}}>
                              <div className="nano-content pad-all">
                                <ul className="list-unstyled media-block">
                                  <li className="mar-btm">
                                    <div className="media-left">
                                      <img src="img/av1.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-left">
                                      <div className="speech">
                                        <a href="#" className="media-heading">John Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-right">
                                      <img src="img/av4.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-right">
                                      <div className="speech">
                                        <a href="#" className="media-heading">Lucy Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-left">
                                      <img src="img/av1.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-left">
                                      <div className="speech">
                                        <a href="#" className="media-heading">John Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-right">
                                      <img src="img/av4.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-right">
                                      <div className="speech">
                                        <a href="#" className="media-heading">Lucy Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-right">
                                      <img src="img/av4.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-right">
                                      <div className="speech">
                                        <a href="#" className="media-heading">Lucy Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-left">
                                      <img src="img/av1.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-left">
                                      <div className="speech">
                                        <a href="#" className="media-heading">John Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-right">
                                      <img src="img/av4.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-right">
                                      <div className="speech">
                                        <a href="#" className="media-heading">Lucy Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-left">
                                      <img src="img/av1.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-left">
                                      <div className="speech">
                                        <a href="#" className="media-heading">John Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-right">
                                      <img src="img/av4.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-right">
                                      <div className="speech">
                                        <a href="#" className="media-heading">Lucy Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mar-btm">
                                    <div className="media-left">
                                      <img src="img/av1.png" className="img-circle img-sm" alt="Profile Picture" />
                                    </div>
                                    <div className="media-body pad-hor speech-left">
                                      <div className="speech">
                                        <a href="#" className="media-heading">John Doe</a>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/*Widget footer*/}
                            <div className="panel-footer">
                              <div className="row">
                                <div className="col-xs-10">
                                  <input type="text" placeholder="Enter your text" className="form-control chat-input" />
                                </div>
                                <div className="col-xs-2">
                                  <button className="btn btn-primary btn-block" type="submit">Send</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*===================================================*/}
                          {/*Chat widget*/}
                        </div>
                      </div>
                    </div>
                    {/*===================================================*/} 
                    {/*End Default Tabs (Left Aligned)*/} 
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===================================================*/}
          {/*End page content*/}
        </div>
        {/*===================================================*/}
        {/*END CONTENT CONTAINER*/}
        {/*MAIN NAVIGATION*/}
        {/*===================================================*/}
        <nav id="mainnav-container">
          {/*Brand logo & name*/}
          {/*================================*/}
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <i className="fa fa-forumbee brand-icon" />
              <div className="brand-title">
                <span className="brand-text">WOW</span>
              </div>
            </a>
          </div>
          {/*================================*/}
          {/*End brand logo & name*/}
          <div id="mainnav">
            {/*Menu*/}
            {/*================================*/}
            <div id="mainnav-menu-wrap">
              <div className="nano">
                <div className="nano-content">
                  <ul id="mainnav-menu" className="list-group">
                    {/*Category name*/}
                    <li className="list-header">Navigation</li>
                    {/*Menu list item*/}
                    <li> <a href="index.html"> <i className="fa fa-home" /> <span className="menu-title"> Dashboard </span> </a> </li>
                    {/*Category name*/}
                    <li className="list-header">Components</li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-th" />
                        <span className="menu-title">
                          Layouts
                        </span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="layout-blank.html"><i className="fa fa-caret-right" /> Blank Page </a></li>
                        <li><a href="layout-boxed.html"><i className="fa fa-caret-right" /> Boxed Version </a></li>
                        <li><a href="layout-collapsed-sidebar.html"><i className="fa fa-caret-right" /> Collapsed Sidebar </a></li>
                        <li><a href="layout-push-menu.html"><i className="fa fa-caret-right" /> Push Menu </a></li>
                        <li><a href="layout-slide-menu.html"><i className="fa fa-caret-right" /> Slide Menu </a></li>
                        <li><a href="layout-horizontal-menu.html"><i className="fa fa-caret-right" /> Horizontal Menu </a></li>
                        <li><a href="layout-horizontal-menu-boxed.html"><i className="fa fa-caret-right" /> Boxed Horizontal </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-briefcase" />
                        <span className="menu-title">UI Elements</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="ui-animation.html"><i className="fa fa-caret-right" /> CSS3 Animation </a></li>
                        <li><a href="ui-panel.html"><i className="fa fa-caret-right" /> Panel </a></li>
                        <li><a href="ui-xeditable.html"><i className="fa fa-caret-right" /> Xeditable </a></li>
                        <li><a href="ui-button.html"><i className="fa fa-caret-right" /> Buttons </a></li>
                        <li><a href="ui-fontawesome.html"><i className="fa fa-caret-right" /> Fontawesome </a></li>
                        <li><a href="ui-icons.html"><i className="fa fa-caret-right" /> Icons </a></li>
                        <li><a href="ui-components.html"><i className="fa fa-caret-right" /> Components </a></li>
                        <li><a href="ui-timeline.html"><i className="fa fa-caret-right" /> Timeline </a></li>
                        <li><a href="ui-nested-lists.html"><i className="fa fa-caret-right" /> Nested Lists </a></li>
                        <li><a href="ui-grids.html"><i className="fa fa-caret-right" /> Grids </a></li>
                        <li><a href="ui-tab.html"><i className="fa fa-caret-right" /> Tab </a></li>
                        <li><a href="ui-accordions.html"><i className="fa fa-caret-right" /> Accordions </a></li>
                        <li><a href="ui-dragdrop.html"><i className="fa fa-caret-right" /> Draggable Panel</a></li>
                        <li><a href="ui-typography.html"><i className="fa fa-caret-right" /> Typography </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-file" />
                        <span className="menu-title">Pages</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="pages-faq.html"><i className="fa fa-caret-right" /> FAQ </a></li>
                        <li><a href="pages-gallery.html"><i className="fa fa-caret-right" /> Gallery </a></li>
                        <li><a href="pages-directory.html"><i className="fa fa-caret-right" /> Directory </a></li>
                        <li><a href="pages-profile.html"><i className="fa fa-caret-right" /> User Profile </a></li>
                        <li><a href="pages-invoice.html"><i className="fa fa-caret-right" /> Invoice </a></li>
                        <li><a href="pages-login.html"><i className="fa fa-caret-right" /> Login </a></li>
                        <li><a href="pages-register.html"><i className="fa fa-caret-right" /> Register </a></li>
                        <li><a href="pages-password-reminder.html"><i className="fa fa-caret-right" /> Password Reminder </a></li>
                        <li><a href="pages-lock-screen.html"><i className="fa fa-caret-right" /> Lock Screen </a></li>
                        <li><a href="pages-404.html"><i className="fa fa-caret-right" /> 404 Error </a></li>
                        <li><a href="pages-500.html"><i className="fa fa-caret-right" /> 500 Error </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-table" />
                        <span className="menu-title">Tables</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="table-static.html"><i className="fa fa-caret-right" /> Static Table <span className="label label-info pull-right">New</span></a></li>
                        <li><a href="table-datatable.html"><i className="fa fa-caret-right" /> Datatable Table </a></li>
                        <li><a href="table-footable.html"><i className="fa fa-caret-right" /> Footable Table </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-edit" />
                        <span className="menu-title">Forms</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="forms-layout.html"><i className="fa fa-caret-right" /> Form Layout </a></li>
                        <li><a href="forms-switchery.html"><i className="fa fa-caret-right" /> Form Switchery </a></li>
                        <li><a href="forms-components.html"><i className="fa fa-caret-right" /> Form Components </a></li>
                        <li><a href="forms-validation.html"><i className="fa fa-caret-right" /> Form Validation </a></li>
                        <li><a href="forms-wizard.html"><i className="fa fa-caret-right" /> Form Wizard </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-line-chart" />
                        <span className="menu-title">Charts</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="charts-flot.html"><i className="fa fa-caret-right" /> Flot Chart </a></li>
                        <li><a href="charts-morris.html"><i className="fa fa-caret-right" /> Morris Chart </a></li>
                      </ul>
                    </li>
                    <li className="list-divider" />
                    {/*Category name*/}
                    <li className="list-header">Extra</li>
                    {/*Menu list item*/}
                    <li>
                      <a href="calendar.html">
                        <i className="fa fa-calendar" />
                        <span className="menu-title">
                          Calendar
                        </span>
                      </a>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="ui-widgets.html">
                        <i className="fa fa-flask" />
                        <span className="menu-title">
                          Widgets
                          <span className="label label-pink pull-right">New</span>
                        </span>
                      </a>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope-o" />
                        <span className="menu-title">Mail</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="mail-inbox.html"><i className="fa fa-caret-right" /> Inbox </a></li>
                        <li><a href="mail-compose.html"><i className="fa fa-caret-right" /> Compose </a></li>
                        <li><a href="mail-mailview.html"><i className="fa fa-caret-right" /> Mail View </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-map-marker" />
                        <span className="menu-title">
                          Maps
                          <span className="label label-mint pull-right">New</span>
                        </span>
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="maps-gmap.html">Google Maps</a></li>
                        <li><a href="maps-vectormap.html">Vector Maps</a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-plus-square" />
                        <span className="menu-title">Menu Level</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                        <li className="list-divider" />
                        <li>
                          <a href="#">Third Level<i className="arrow" /></a>
                          {/*Submenu*/}
                          <ul className="collapse">
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">Third Level<i className="arrow" /></a>
                          {/*Submenu*/}
                          <ul className="collapse">
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li className="list-divider" />
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  {/*Widget*/}
                  {/*================================*/}
                  <div className="mainnav-widget">
                    {/* Show the button on collapsed navigation */}
                    <div className="show-small">
                      <a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
                        <i className="fa fa-desktop" />
                      </a>
                    </div>
                    {/* Hide the content on collapsed navigation */}
                    <div id="demo-wg-server" className="hide-small mainnav-widget-content">
                      <ul className="list-group">
                        <li className="list-header pad-no pad-ver">Server Status</li>
                        <li className="mar-btm">
                          <span className="label label-primary pull-right">15%</span>
                          <p>CPU Usage</p>
                          <div className="progress progress-sm">
                            <div className="progress-bar progress-bar-primary" style={{width: '15%'}}>
                              <span className="sr-only">15%</span>
                            </div>
                          </div>
                        </li>
                        <li className="mar-btm">
                          <span className="label label-purple pull-right">75%</span>
                          <p>Bandwidth</p>
                          <div className="progress progress-sm">
                            <div className="progress-bar progress-bar-purple" style={{width: '75%'}}>
                              <span className="sr-only">75%</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*================================*/}
                  {/*End widget*/}
                </div>
              </div>
            </div>
            {/*================================*/}
            {/*End menu*/}
          </div>
        </nav>
        {/*===================================================*/}
        {/*END MAIN NAVIGATION*/}
      </div>
             <Nav1/>

                </div>

            </div>

     
    );

    
   
  

}}
