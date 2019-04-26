import { Link } from 'react-router-dom';


import React from 'react';
import axios from "axios";
import logo from './logo_label.png';


class Nav1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Sessions:[]
        } ;



    };
    componentDidMount() {
        this.loadJudges();
    }

    loadJudges = ()=> {
        axios.get('http://localhost:6003/sessions').then(res => {

            this.setState({Sessions: res.data});
        })
    }
    render() {
        return (

            <nav id="mainnav-container">

                <div className="navbar-header">
                    <a href="/" className="navbar-brand h_108">
                       
                        <div className="brand-title">
                            <img className="logo_h_91 signin_html_wrap btm_0" src={logo} />
                        </div>
                    </a>
                </div>

                <div id="mainnav">


                    <div id="mainnav-menu-wrap">
                        <div className="nano">
                            <div className="nano-content">
                                <ul id="mainnav-menu" className="list-group txt_left">

                                    <li className="list-header txt_center">MENU</li>

                                    <li><a href="/"> <i className="fa fa-home"></i> <span
                                        className="menu-title"> Dashboard </span> </a></li>

                                  
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
                                            Sessions
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">


                                            {this.state.Sessions.map(d=> (
                                                <li>

                                                    <Link to={"/SecondTour/"+d._id}params={{ id1: d._id}}>{d.Name}</Link>
                                                </li>))}


                                        </ul>
                                        <ul className="collapse">


                                            {this.state.Sessions.map(d=> (
                                                <li>

                                                    <Link to={"/votes/"+d._id}params={{ id1: d._id}}>{d.Name}</Link>
                                                </li>))}


                                        </ul>
                                    </li>

                                     <li><a href="/logout"> <i className="fa fa-sign-out"></i> <span
                                        className="menu-title"> Logout </span> </a></li>










                                </ul>

                                

                            </div>
                        </div>


                    </div>


                </div>
            </nav>




        );
    }
}


export default Nav1;