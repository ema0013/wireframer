import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DiagramCard from './DiagramCard';

class DiagramLinks extends React.Component {
    render() {
        if(!this.props.todoLists){
            return(
                <div className="todo-lists section">
                </div>
            );
        }
        this.props.todoLists.sort(this.compare);
        const todoLists = this.props.todoLists;
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/diagram/' + todoList.id} key={todoList.id}>
                        <DiagramCard todoList={todoList} />
                    </Link>
                ))}
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
    return {
        diagrams: state.firestore.ordered.diagrams,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(Diagramlinks);