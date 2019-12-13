import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import DiagramLinks from './DiagramLinks';
import {getFirestore} from 'redux-firestore';
import { firestore } from 'firebase';

class HomeScreen extends Component {

    handleNewDiagram = () =>{
        const fireStore = getFirestore();
        var currentDate = new Date();
        var timestamp = currentDate.getTime();

        fireStore.collection('diagrams').add({
            name:"",
            last_updated:timestamp,
            userid:this.props.auth.uid,
            height:600,
            width:800,
            controls:[]
        });
    }

    deleteDiagram = () =>{

    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <DiagramLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            WireFramer<br />
                            Project Diagram Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_diagram_button" onClick={this.handleNewDiagram}>
                                    Create a New Diagram
                                </button>
                        </div>
                    </div>
                </div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                    <h4>Delete Current Diagram</h4>
                    <p>Are you sure you want to delete the current diagram?</p>
                    </div>
                    <div className="modal-footer">
                    <Link className="modal-close waves-effect waves-red btn-flat" to="/" onClick={this.deleteDiagram}>Yes</Link>
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">No</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection:'diagrams'},
    ]),
)(HomeScreen);