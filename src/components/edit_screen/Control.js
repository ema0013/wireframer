import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Rnd} from "react-rnd";

class Control extends React.Component{
    render(){
      const control = this.props.control;
        if(control.type === "label"){
          return(
            <Rnd
              size={{width:control.width, height:control.height}}
              position={{x:control.x, y:control.y}}
              onDragStop={(e, d) => { this.props.updateCoord(e,d,control.id) }}
              bounds={"parent"}>
              <label>
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
              onDragStop={(e, d) => { this.props.updateCoord(e,d,control.id) }}
              bounds={"parent"}>
              <div className="materialize-textarea">
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
              onDragStop={(e, d) => { this.props.updateCoord(e,d,control.id) }}
              bounds={"parent"}>
              <div className="container">
              </div>
            </Rnd>
          );
        }
        if(control.type === "button"){
          return(
            <Rnd
              size={{width:control.width, height:control.height}}
              position={{x:control.x, y:control.y}}
              onDragStop={(e, d) => { this.props.updateCoord(e,d,control.id) }}
              bounds={"parent"}>
              <div className="button">
                {control.text}
              </div>
            </Rnd>
          );
        }
    }

}

export default (Control);