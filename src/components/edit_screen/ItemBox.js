import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Control from './Control.js';

class ItemBox extends React.Component{
    // create the consts for 4 control types
    // implement the boxes used to toggle which control you're clicking on
    state = {
        rerender:true
    }
    render(){
        const style={
            width:this.props.width,
            height:this.props.height
        }
            if(!this.props.controls){
                return(
                    <div className="item_box">
                    </div>
                )
            }
            return(
                <div className='item_box container grey z-depth-2 col s9' style={style}>
                    {this.props.controls.map(control =>
                        <Control control={control} updateCoord={this.props.updateCoord} toggleSelected={this.props.toggleSelected} resizeControl = {this.props.resizeControl}/>
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