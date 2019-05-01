import React, { Component } from 'react';
import Moment from 'moment';
import {Link} from "react-router-dom";


class TableSessions extends Component {


    render() {
        return (
            <tr>
                <td>

                    <Link to={"/sessions/listeProjetsparIdSes/"+ this.props.obj._id} params={{ idSession: this.props.obj._id}}>{this.props.obj.Name}</Link>
                </td>
                <td>
                    {Moment(this.props.obj.StartDate).format('DD-MM-YYYY')}
                </td>
                <td>
                    {Moment(this.props.obj.EndDate).format('DD-MM-YYYY')}
                </td>
                <td>
                    {this.props.obj.Status}
                </td>

            </tr>
        );
    }
}

export default TableSessions;