import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DiagramCard from './DiagramCard';
import M from 'materialize-css';
import {getFirestore} from 'redux-firestore';

class DiagramLinks extends React.Component {

    initModal = (diagramid) =>{
        let firestore = getFirestore();
        let currentList = firestore.collection("diagrams").doc(diagramid);
        currentList.update({last_updated:new Date().getTime()});
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        instances[0].open();
        
    }
    
    render() {
        if(!this.props.diagrams){
            return(
                <div className="diagrams section">
                </div>
            );
        }
        this.props.diagrams.sort(this.compare);
        const diagrams = this.props.diagrams;
        console.log(diagrams);
        return (
            <div className="diagrams section">
                {diagrams && diagrams.filter(diagram => diagram.userid === this.props.auth.uid)
                                    .map(diagram =>
                    <div>
                        <div className="btn" onClick={event => this.initModal(diagram.id)}>
                            <i className="material-icons">delete</i>
                        </div>
                        <Link to={'/diagram/' + diagram.id} key={diagram.id}>
                            <DiagramCard diagram={diagram} />
                        </Link>
                    </div>
                    
                )}
            </div>
        );
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
}

const mapStateToProps = (state) => {
    console.log(state.firestore.ordered);
    return {
        diagrams: state.firestore.ordered.diagrams,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(DiagramLinks);