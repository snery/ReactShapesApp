import Multiselect from 'multiselect-react-dropdown';
import Reactm, { Component, PropsWithChildren } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { Shape, Color } from './ShapesInterfaces';
import './Css/ShapesForm.css';

export interface ShapesFormState {
    Shapes: Shape[],
    Colors: Color[],
    ShapesLoading: boolean,
    ColorsLoading: boolean,
    HasError: boolean,
    Render: boolean,
    HandleClick: any,
    SelectedShape: Shape,
    SelectedColors: Color[]
}

export class ShapesForm extends Component<ShapesFormState>{
    public state: ShapesFormState;
    baseApiUrl: string = "https://localhost:7032/";
    handleClick: any;

    constructor(props: ShapesFormState){
        super(props);
        this.state = {...props};
        this.getColors();
        this.getShapes();
    }

    public render() {
        let shapesDropdown = this.renderShapeDropdown(this.state.Shapes);
        let colorsDropdown = this.renderColorsMultiSelect(this.state.Colors);
        let isLoading = this.state.ShapesLoading && this.state.ColorsLoading;

        if(this.state.HasError){
            return <div>
                <ErrorMessage />
            </div>
        }

        return isLoading ? 
            <LoadingSpinner/> :
            <div>
                <p>Please select a shape and color(s), then click the button to render the draggable image.</p>
                <div className="select">{shapesDropdown}</div>
                <div className="select">{colorsDropdown}</div>
                <div className="buttonWrapper">
                    <button disabled={this.state.SelectedShape.name == '' || this.state.SelectedColors.length < 1} onClick={this.onClick}>Render</button>
                </div>
            </div>;
    }

    onClick = () => {
        this.state.HandleClick(true, this.state.SelectedShape, this.state.SelectedColors);
    }

    private renderShapeDropdown(shapes: Shape[]) {
        return <select className='searchWrapper' onChange={this.onSelectShape}>                
                <option className="shapeOption" value="">Select Shape</option>
                {shapes.map((shape) =>
                    <option key={shape.name} className="shapeOption" value={shape.name}>{shape.name}</option>
                )}
            </select>
    }

    onSelectShape = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ SelectedShape:{"name": event.target.value }});
    };

    private renderColorsMultiSelect(colors: Color[]) {             
        return <Multiselect options={colors} 
                displayValue="name"
                onSelect={this.onSelectColors}
                onRemove={this.onSelectColors}
                placeholder="Select Colors"></Multiselect>
    }

    onSelectColors = (selectedItems: Color[]) =>{
        this.setState({ SelectedColors: selectedItems });
    }

    private getShapes() {
        fetch(this.baseApiUrl + 'api/shapes')
            .then(function (response) {
                if (response.ok) {
                    return response;
                }
                throw new Error("Unable to fetch data");
            })
            .then(response => response.json() as Promise<Shape[]>)
            .then(data => {
                this.setState({ Shapes: data, ShapesLoading: false, HasError: false })
            })
            .catch(error => {
                this.setState({ IsLoading: false, HasError: true })
            });
    }

    private getColors() {
        fetch(this.baseApiUrl + 'api/colors')
            .then(function (response) {
                if (response.ok) {
                    return response;
                }
                throw new Error("Unable to fetch data");
            })
            .then(response => response.json() as Promise<Color[]>)
            .then(data => {
                this.setState({ Colors: data, ColorsLoading: false, HasError: false })
            })
            .catch(error => {
                this.setState({ IsLoading: false, HasError: true })
            });
    }
}