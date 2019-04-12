import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {deleteJudge,
} from "../../../store/actions";
import {connect} from "react-redux";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';
class JudgeList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            Judges:[]

        } ;
        this.handleclick = this.handleclick.bind(this);


    };


    componentDidMount() {
        axios.get('http://localhost:6003/Judges/listJudges').then(res=>{
            console.log("hhh")
            console.log(res.data);
            this.setState({Judges:res.data});
        })
    }

    handleclick(id,id1){
        this.props.deleteJudge(id,id1);
    }



    render(){

        return (

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

<Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>



                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">     <a href="/Judges/demandes">Judges</a>->all</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>lastName and FirstName </th>
                                        <th>Email</th>
                                        <th className="min-tablet">Creation date</th>
                                        <th className="min-tablet">Status</th>
                                        <th className="min-desktop">Action</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.Judges.map(function(d, idx){
                                        return (

                                            <tr key={idx}>
                                                <td>{d.LastName } { d.FirstName }</td>
                                                <td>{ d.Email }</td>
                                                <td>{ d.creationDate}</td>
                                                <td> {d.Status }</td>
                                                <td>    <button
                                                    onClick={() => this.handleclick(d._id,d._id)}


                                                    href="/"
                                                    className="btn btn-success"
                                                >Delete
                                                </button>
                                                <button className="btn btn-danger">  <Link to={"/Judges/editCompte/"+d._id}params={{ id1: d._id}}>Edit</Link>
                                                </button>

                                                </td>
                                            </tr>
                                        )
                                    }.bind(this))}


                                    </tbody>
                                </table>




                            </div>
                        </div>


                    </div>

               <Nav/>

                </div>

            </div>






        )
    }
}
const mapDispatchToProps = {
    deleteJudge

};

export default connect(
    null,
    mapDispatchToProps
)(JudgeList);
