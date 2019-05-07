import React from 'react';
import axios from "axios";

import Header2 from'../../../containers/Header2.js';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


const AVG = 1;
class showSessions extends React.Component{




    constructor(props) {
        super(props);
        this.state = {

session:[]
        };


    };




    componentDidMount(){
        axios.get(`http://localhost:6003/sessionsWij/getSession`)
            .then(response => {
                this.setState({ session: response.data });
                console.log(response.data)
            })

    }

    render(){
        const {session} = this.state;
        return (
            <div>

                <Header2/>

                <div id="content-container">
                    <br/>
                    <br/>
<div className="row">

                    <div className="panel">


                            {this.state.session.map(function(d, idx) {

                            return(
                                <form id="demo-custom-container" action="#" className="form-horizontal">

                                        <h4>{d.Name}</h4>
                                        <div className="form-group">

                                            <center>
                                                <button className="btn btn-info btn-lg" type="submit"><Link
                                                    to={"/Question"}>Label</Link></button>
                                            </center>
                                        </div>





                                </form>)
                            })}






</div></div>


                </div>








            </div>
        )

    }}
const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(showSessions);
