import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Control from './Control.js';

class ItemBox extends React.Component{
    // create the consts for 4 control types
    // implement the boxes used to toggle which control you're clicking on

    render(){
        const diagram = this.props.diagram;
        const style={
            width:diagram.width,
            height:diagram.height
        }
            if(!diagram){
                return(
                    <div className="item_box">
                    </div>
                )
            }
            return(
                <div className='item_box container grey z-depth-2' style={style}>
                    {diagram.controls.map(control =>
                        <Control control={control} updateCoord={this.props.updateCoord}/>
                    )}
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