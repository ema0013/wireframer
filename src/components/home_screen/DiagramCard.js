import React from 'react';
import {getFirestore} from 'redux-firestore';

class DiagramCard extends React.Component {

    updateTimeStamp = () =>{
        let firestore = getFirestore();
        let currentList = firestore.collection("diagrams").doc(this.props.diagram.id);
        currentList.update({last_updated:new Date().getTime()});
    }

    render() {
        const { diagram } = this.props;
        console.log("diagramcard, diagram.id: " + diagram.id);
        return (
            <div className="card z-depth-0 diagram-link">
                <div className="card-content grey-text text-darken-3 hoverable" onClick={this.updateTimeStamp}>
                    <span className="card-title">{diagram.name}</span>
                </div>
            </div>
        );
    }
}
export default DiagramCard;