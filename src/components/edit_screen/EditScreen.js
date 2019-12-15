import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import ItemBox from './ItemBox.js';
import NumericInput from 'react-numeric-input';
//TODO
//get the dimension changes working
//implement control maker

class DiagramScreen extends Component {
    state = {
        name: this.props.diagram.name,
        last_updated:0,
        selectedControl:null,
        width:this.props.diagram.width,
        height:this.props.diagram.height,
        controls:this.props.diagram.controls,
    }

    saveChanges = ()=>{
        let firestore = getFirestore();
        const diagramRef = firestore.collection('diagrams');
        let currentDiagram = diagramRef.doc(this.props.id);
        currentDiagram.update({name:this.state.name});
        currentDiagram.update({last_updated:this.state.last_updated});
        currentDiagram.update({width:this.state.width});
        currentDiagram.update({height:this.state.height});
        currentDiagram.update({controls:this.state.controls});
    }

    handleNameChange = (e) => {
        const { target } = e;
        console.log(target);
        this.setState(()=>({
            name:target.value
        }));
        this.setState(() => ({
            last_updated: new Date().getTime()
        }));
    }

    handleWidthChange = (e) =>{
        this.setState(()=>({
            width:e.currentTarget.value
        }));
        this.setState(() => ({
            last_updated: new Date().getTime()
        }));
        // let firestore = getFirestore();
        // const diagramRef = firestore.collection('diagrams');
        // let currentDiagram = diagramRef.doc(this.props.id);
        // currentDiagram.update({width:e.currentTarget.value});
        // currentDiagram.update({last_updated:this.state.last_updated});

    }

    handleHeightChange = (e) =>{
        this.setState(()=>({
            height:e.currentTarget.value
        }));
        this.setState(() => ({
            last_updated: new Date().getTime()
        }));
        // let firestore = getFirestore();
        // const diagramRef = firestore.collection('diagrams');
        // let currentDiagram = diagramRef.doc(this.props.id);
        // currentDiagram.update({height:e.currentTarget.value});
        // currentDiagram.update({last_updated:this.state.last_updated});
    }

    toggleSelected = (control) =>{
        this.setState({selectedControl:control === this.state.selectedControl ? null : control});
        let newControls = this.state.controls;
        newControls.forEach(controli => controli.is_selected = (controli === control ? true : false));
        // let firestore = getFirestore();
        // const diagramRef = firestore.collection('diagrams');
        // let currentDiagram = diagramRef.doc(this.props.id);
        // currentDiagram.update({controls:newControls});
    }

    updateCoord = (e,d, controlIndex) =>{
        const x = d.x;
        const y = d.y;
        let new_controls = this.state.controls;
        new_controls[controlIndex].x = x;
        new_controls[controlIndex].y = y;
        this.setState({controls:new_controls},()=>console.log(this.state.controls));
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
                <div className="btn " onClick={this.saveChanges}>Save your Work</div>
                <div className="input-field">
                    <label className="active" htmlFor="email">Name</label>
                    <input type="text" name="name" id="name" onChange={this.handleNameChange} value={this.state.name} />
                    <div className="row">
                        <label className="active col s6" htmlFor="diagram-width">Diagram Width</label>
                        <label className="active col s6" htmlFor="diagram-height">Diagram Height</label>
                        <input className="col s6" type="number" onChange={e=>this.handleWidthChange(e)} value={this.state.width}/>
                        <input className="col s6" type="number" onChange={e=>this.handleHeightChange(e)} value={this.state.height}/>
                    </div>
                </div>
                <ItemBox controls={this.state.controls} width={this.state.width} height={this.state.height} updateCoord={this.updateCoord} toggleSelected={this.toggleSelected}/>
                
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