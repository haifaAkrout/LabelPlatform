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


                    <div className="panel">

                        <div className="panel-heading">
                            {this.state.session.map(function(d, idx) {

                            return(
                                <form id="demo-custom-container" action="#" className="form-horizontal">
                                    <div className="panel-body">
                                        <h1>{d.Name}</h1>
                                        <div className="form-group">

                                            <center>
                                                <button className="btn btn-info btn-lg" type="submit"><Link
                                                    to={"/Question"}>Apply</Link></button>
                                            </center>
                                        </div>


                                    </div>
                                    <div className="panel-footer">
                                        <div className="row">
                                            <div className="col-sm-7 col-sm-offset-3">

                                            </div>
                                        </div>
                                    </div>
                                </form>)
                            })}
                    </div>





</div>


                </div>








            </div>
        )

    }}
const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(showSessions);
