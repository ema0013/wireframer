import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';
class DiagramScreen extends Component {
    state = {
        name: this.props.diagram.name,
        last_updated:'',
    }
    handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        this.setState(() => ({
            last_updated: new Date().getTime()
        }));
        let firestore = getFirestore();
        let currentDiagram = firestore.collection("diagrams").doc(this.props.diagram.id);
        currentDiagram.update({[target.id]:target.value});
        currentDiagram.update({last_updated:this.state.last_updated});
    }
    render() {
        const auth = this.props.auth;
        const diagram = this.props.diagram;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">
                    Diagram                           
                </h5>
                
                <div className="input-field">
                    <label className="active" htmlFor="email">Name</label>
                    <input type="text" name="name" id="name" onChange={this.handleChange} value={diagram.name} />
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { diagram } = state.firestore.data;
    console.log(state);
  
    return {
      diagram,
      auth: state.firebase.auth,
    };
  };

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'diagrams' },
  ]),
)(DiagramScreen);