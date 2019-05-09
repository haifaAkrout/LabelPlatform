import React, { Component, Suspense } from 'react';
import Nav1 from '../../containers/Nav1.js';
import Header from '../../containers/Header.js';
import ContentContainer from '../../containers/ContentContainer';
import Nav2 from '../../containers/Nav2.js';

export default class Dashboard extends Component{

    render(){
        return (

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
                <Header/>

                <div className="boxed">
                    <ContentContainer/>

                    <Nav2/>

                </div>

            </div>

        )
    }
}



