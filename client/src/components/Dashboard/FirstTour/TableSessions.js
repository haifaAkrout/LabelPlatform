import React, { Component } from 'react';
import Moment from 'moment';
import {Link} from "react-router-dom";


class TableSessions extends Component {


    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.Name}
                </td>
                <td>
                    {Moment(this.props.obj.StartDate).format('DD-MM-YYYY')}
                </td>
                <td>
                    {Moment(this.props.obj.EndDate).format('DD-MM-YYYY')}
                </td>
                <td>
                    <Link to={"/ListeProjetByIDSessions/"+this.props.obj._id} className="btn btn-primary">{this.props.obj.Status}</Link>
                </td>

            </tr>
        );
    }
}

export default TableSessions;