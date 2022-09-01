import { Component } from "react";
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
    colorsCount: number;
    colorIndex: number = 0;    
    date: Date = new Date();
    
    constructor(props: DraggableShapeState){
        super(props);
        this.state = {...props};
        this.colorsCount = this.state.Colors.length;
        document.documentElement.style.setProperty("--start-color", this.state.Colors[this.colorIndex].name);        
        document.documentElement.style.setProperty("--end-color", this.state.Colors[this.colorIndex + 1].name);
    }

    public render() {
        return <div>
                    <p>Drag the shape to make it change colors!</p>
                    <Draggable onDrag={this.onDragEvent}>
                        <div id="draggableDiv" className={this.state.Shape.name} 
                            style={this.state.Shape.name == 'triangle' ? {"borderBottomColor": this.state.Colors[0].name } 
                            : {"backgroundColor": this.state.Colors[0].name}}></div>
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
        if (this.state.Shape.name == 'triangle') {
            if(!document.querySelector("#draggableDiv")?.classList.contains('transformColorTriangle')){
                document.querySelector("#draggableDiv")?.classList.add('transformColorTriangle');
            }
        }
        else {
            if(!document.querySelector("#draggableDiv")?.classList.contains('transformColor')){
                document.querySelector("#draggableDiv")?.classList.add('transformColor');
            }            
        }

        var now = new Date();
        var secondsOffset = now.getSeconds() - this.date.getSeconds();

        if (secondsOffset >= 2 || secondsOffset <= -2) {
            this.date = new Date();
            this.colorIndex++;

            if(this.colorIndex > this.colorsCount){
                this.colorIndex = 0;
            }
            
            if(this.state.Colors[this.colorIndex]){
                document.documentElement.style.setProperty("--end-color", this.state.Colors[this.colorIndex]?.name);
            }
        }
    }
}