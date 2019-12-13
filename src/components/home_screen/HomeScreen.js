import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import DiagramLinks from './DiagramLinks';
import {getFirestore} from 'redux-firestore';
import M from 'materialize-css';
import { firestore } from 'firebase';

class HomeScreen extends Component {

    state = {
        currentDiagram:''
    }

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
        //the current selected diagram should be on top of the list
        let diagrams = this.props.diagrams.filter(diagram => diagram.userid === this.props.auth.uid);
        diagrams.sort(this.compare);
        const firestore = getFirestore();
        firestore.collection('diagrams').doc(diagrams[0].id).delete(); 
    }
    
    compare = (list1,list2) =>{
        let stamp1 = list1.last_updated;
        let stamp2 = list2.last_updated;
        if(stamp1 > stamp2){
            return -1;
        }
        else if (stamp1 === stamp2){
            return 0;
        }
        else{
            return 1;
        }
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
                        
                        <div className="home_new_diagram_container">
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
        diagrams: state.firestore.ordered.diagrams,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection:'diagrams'},
    ]),
)(HomeScreen);