import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

class ControlMaker extends React.Component{

}
const mapStateToProps = (state) => {
    console.log(state.firestore.ordered);
    return {
        diagrams: state.firestore.ordered.diagrams,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(ControlMaker);