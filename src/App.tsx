import Reactm, { Component } from 'react';
import './Css/App.css';
import { DraggableShape } from './DraggableShape';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { ShapesForm, ShapesFormState } from './ShapesForm';
import { Shape, Color } from './ShapesInterfaces';

interface ShapesState {
    Shapes: Shape[],
    SelectedShape: any,
    Colors: Color[],
    SelectedColors: Color[],
    IsLoading: boolean,
    HasError: boolean,
    RenderShape: boolean
}

class App extends Component<ShapesState> {
    public state: ShapesState;
    selectedColors: Color[] = [];
    renderShape: boolean = false;

    constructor(props: ShapesState) {
        super(props);
        this.state = {...props};
    }

    handleClick = (renderShape: boolean, selectedShape: Shape, selectedColors: Color[]) => {
        this.setState({ RenderShape: renderShape, SelectedShape: selectedShape, SelectedColors: selectedColors});
    }

    public render() {
        let shapeContext = this.state.RenderShape ?
            <DraggableShape Shape={this.state.SelectedShape} Colors={this.state.SelectedColors} HandleClick={this.handleClick}/>
            : <ShapesForm Shapes={[]} Colors={[]} ShapesLoading={true} ColorsLoading={true} HasError={false} Render={false} HandleClick={this.handleClick} SelectedShape={{"name":""}} SelectedColors={[]} />

        return <div className="mainWrapper">
                <div className="mainContainer">{shapeContext}</div>
                </div>
    }
}

export default App;
