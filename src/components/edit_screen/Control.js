import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Rnd} from "react-rnd";

class Control extends React.Component{
  state = {
    jankSolution:false
  }
    updatePlease = (e,d,controlId) =>{
      this.props.updateCoord(e,d,controlId);
      this.setState({jankSolution:false});
    }

    updateTogglePlease = (control) =>{
      this.props.toggleSelected(control);
      this.setState({jankSolution:false});
    }

    render(){
      const control = this.props.control;
      console.log(control.is_selected)
        if(control.type === "label"){
          return(
            <Rnd
              size={{width:control.width, height:control.height}}
              position={{x:control.x, y:control.y}}
              onDragStop={(e, d) => { this.updatePlease(e,d,control.id) }}
              onClick={this.updateTogglePlease(control)}
              bounds={"parent"}
              style={{borderStyle:"solid" }}
              >
              <label id={control.is_selected ? "toggled":""}
              style={{backgroundColor:control.color, 
                width:'100%',
                height:'100%'}}>
                {control.text}
              </label>
            </Rnd>
          );
        }
        if(control.type === "text_field"){
          return(
            <Rnd
              size={{width:control.width, height:control.height}}
              position={{x:control.x, y:control.y}}
              onDragStop={(e, d) => { this.updatePlease(e,d,control.id) }}
              onClick={this.props.toggleSelected(control)}
              bounds={"parent"}
              style={{borderStyle:"solid"}}>
              <div className="materialize-textarea" id={control.is_selected ? "toggled":""}
              style={{backgroundColor:control.color,
                      width:'100%',
                      height:'100%'}}>
                {control.text}
              </div>
            </Rnd>
          );
        }
        if(control.type === "container"){
          return(
            <Rnd
              size={{width:control.width, height:control.height}}
              position={{x:control.x, y:control.y}}
              onDragStop={(e, d) => { this.updatePlease(e,d,control.id) }}
              onClick={this.props.toggleSelected(control)}
              bounds={"parent"}
              style={{borderStyle:"solid"}}>
              <div className="container" id={control.is_selected ? "toggled":""}
              style={{backgroundColor:control.color,
                width:'100%',
                height:'100%'}}>
              </div>
            </Rnd>
          );
        }
        if(control.type === "button"){
          return(
            <Rnd
              size={{width:control.width, height:control.height}}
              position={{x:control.x, y:control.y}}
              onDragStop={(e, d) => { this.updatePlease(e,d,control.id) }}
              onClick={this.props.toggleSelected(control)}
              bounds={"parent"}
              style={{borderStyle:"solid"}}>
              <div className="btn" id={control.is_selected ? "toggled":""}
              style={{backgroundColor:control.color,
                width:'100%',
                height:'100%'}}>
                {control.text}
              </div>
            </Rnd>
          );
        }
    }

}

export default (Control);