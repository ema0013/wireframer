import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DiagramCard from './DiagramCard';

class DiagramLinks extends React.Component {
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
                    <Link to={'/diagram/' + diagram.id} key={diagram.id}>
                        <DiagramCard diagram={diagram} />
                    </Link>
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