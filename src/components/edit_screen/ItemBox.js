import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

class ItemBox extends React.Component{
    render(){
        console.log(this.props);
        return(
            <div className="item_box">
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(ItemBox);