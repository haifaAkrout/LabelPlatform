import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {deleteJudge,
} from "../../../store/actions";
import {connect} from "react-redux";
import TableSessions from "./TableSessions"
export  default  class listCandidatures extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            Sessions:[]
        } ;



    };


    componentDidMount() {
        axios.get('http://localhost:6001/sessions')
            .then(response => {
                this.setState({sessions: response.data});
                //console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        return this.state.sessions.map(function (object, i) {
            return <TableSessions obj={object} key={i}/>;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Sessions List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {   this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }

}
