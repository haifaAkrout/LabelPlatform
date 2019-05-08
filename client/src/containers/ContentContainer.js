

import React from 'react';


class ContentContainer extends React.Component {
    render() {
        return (

                <div className="pageheader hidden-xs">
                    <h3 style={{float:"left"}}><i className="fa fa-home"></i> Labelling Platform </h3>
                    <div className="breadcrumb-wrapper">
                        <span className="label">You are here:</span>
                        <ol className="breadcrumb">
                            <li><a href="#"> Home </a></li>
                            <li className="active"> Dashboard</li>
                        </ol>
                    </div>
                </div>





        );
    }
}


export default ContentContainer;