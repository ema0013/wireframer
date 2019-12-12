import React from 'react';
import {getFirestore} from 'redux-firestore';
import {Icon,Button} from 'react-materialize';

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
            <div className="card z-depth-0 diagram-link" onClick={this.updateTimeStamp}>
                <div className="right-align col s2">
                <Button fab={{direction:'left'}} className="red right-align" floating>
                    <Button floating icon={<Icon>delete</Icon>} classname="red" onClick={this.deleteDiagram}></Button>
                </Button>
                </div>
                    <div className="card-content grey-text text-darken-3 hoverable">
                        <span className="card-title">{diagram.name}</span>
                    </div>
            </div>
        );
    }
}
export default DiagramCard;