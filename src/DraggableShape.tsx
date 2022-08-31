import { Component, ReactNode } from "react";
import Draggable from "react-draggable";
import { Color, Shape } from "./ShapesInterfaces";
import './Css/Shapes.css';
import './Css/ShapesForm.css';

interface DraggableShapeState{
    Shape: Shape,
    Colors: Color[],
    HandleClick: any
}

export class DraggableShape extends Component<DraggableShapeState>{
    state: DraggableShapeState;
    
    constructor(props: DraggableShapeState){
        super(props);
        this.state = {...props};
    }

    public render() {
        return <div>
                    <Draggable onDrag={this.onDragEvent}>
                        <div className={this.state.Shape.name} 
                        style={ this.state.Shape.name != 'triangle' ? {"backgroundColor": this.state.Colors[0].name} :
                        {"borderBottomColor": this.state.Colors[0].name}}></div>
                    </Draggable>
                    <div className="buttonWrapper">
                        <button onClick={this.onClick}>Return</button>
                    </div>
                </div>
    }

    onClick = () => {
        this.state.HandleClick(false, this.state.Shape, this.state.Colors);
    }

    onDragEvent = (e: any) => {
        let x = e.target;
    }
}