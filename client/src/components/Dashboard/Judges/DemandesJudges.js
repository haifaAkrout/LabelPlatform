import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    deleteJudge, setCurrentUser,
} from "../../../store/actions";
import {connect} from "react-redux";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';
import {NotificationManager} from "react-notifications";
import setAuthToken from "../../../setAuthToken";
import jwt_decode from "jwt-decode";
class JudgeList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            Judges:[],
            loading:true

        } ;
        this.handleclick = this.handleclick.bind(this);


    };

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Votre email a étè envoyée avec succées');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };
    componentDidMount() {


        console.log(localStorage.getItem('jwtToken'));
      //   setAuthToken(localStorage.getItem("token"));
        const decoded = jwt_decode(localStorage.getItem('jwtToken'));
        const user1 =setCurrentUser(decoded)
        console.log(user1.id)
        this.loadJudges();
    }

    loadJudges = ()=> {
        axios.get('http://localhost:6003/Judges/listJudges').then(res => {

            this.setState({Judges: res.data,loading:false});
        })
    }

    handleclick(id,id1){


        axios.delete('http://localhost:6003/judges/'+id+'/'+id1
        ).then((res)=>{

                   console.log(res.data.done)
this.loadJudges()

           }).catch(()=>{

           })






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
                                <h3 className="panel-title">     <a href="/Judges/demandes"><strong>Judges </strong></a><strong>->all</strong></h3>
                            </div>
                            <div className="panel-body">
                                <table ref="table2" id="demo-dt-basic" className="table table-striped table-bordered">
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
                                                    className="btn btn-info"
                                                >Delete
                                                </button>
                                                <button className="btn btn-pink">  <Link to={"/Judges/editCompte/"+d._id}params={{ id1: d._id}}>Edit</Link>
                                                </button>

                                                </td>
                                            </tr>
                                        )
                                    }.bind(this))}


                                    </tbody>
                                </table>

                          <strong>  <Link to={"/Judges/sendEmail/"}>Add a judge</Link></strong>


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
