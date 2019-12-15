import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import ItemBox from './ItemBox.js';

class DiagramScreen extends Component {
    state = {
        name: this.props.diagram.name,
        last_updated:'',
        selectedControl:null,
        controls:this.props.diagram.controls,
    }
    handleNameChange = (e) => {
        const { target } = e;
        this.setState(()=>({
            name:target.value
        }));
        this.setState(() => ({
            last_updated: new Date().getTime()
        }));
        let firestore = getFirestore();
        const diagramRef = firestore.collection('diagrams');
        let currentDiagram = diagramRef.doc(this.props.id);
        currentDiagram.update({name:target.value});
        currentDiagram.update({last_updated:this.state.last_updated});
    }
    toggleSelected = (control) =>{
        this.setState({selectedControl:control === this.state.selectedControl ? null : control});
        let newControls = this.state.controls;
        newControls.forEach(controli => controli.is_selected = (controli === control ? true : false));
        let firestore = getFirestore();
        const diagramRef = firestore.collection('diagrams');
        let currentDiagram = diagramRef.doc(this.props.id);
        currentDiagram.update({controls:newControls});
    }

    updateCoord = (e,d, controlIndex) =>{
        const x = d.x;
        const y = d.y;
        const firestore = getFirestore();
        const diagramRef = firestore.collection('diagrams');
        let diagram = diagramRef.doc(this.props.id);
        let new_controls = this.state.controls;
        new_controls[controlIndex].x = x;
        new_controls[controlIndex].y = y;
        this.setState({controls:new_controls});
        diagram.update({controls:new_controls});
    }
    render() {
        const auth = this.props.auth;
        const diagram = this.props.diagram;
        if (!auth.uid) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">
                    Diagram                           
                </h5>
                
                <div className="input-field">
                    <label className="active" htmlFor="email">Name</label>
                    <input type="text" name="name" id="name" onChange={this.handleNameChange} value={diagram.name} />
                </div>
                <ItemBox diagram={this.props.diagram} updateCoord={this.updateCoord} toggleSelected={this.toggleSelected}/>
                
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { diagrams } = state.firestore.data;
    let diagram = diagrams ? diagrams[id] : null;
  
    return {
      diagram,
      id,
      auth: state.firebase.auth,
    };
  };

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'diagrams' },
  ]),
)(DiagramScreen);