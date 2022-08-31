import * as React from 'react';
import './Css/LoadingSpinner.css';

export class LoadingSpinner extends React.Component<{}, {}>{
    public render() {
        return <div className="loadingWrapper">
            <div className="loader"></div>
        </div>;
    }
}