import * as React from 'react';

export class ErrorMessage extends React.Component<{}, {}>{
    public render() {
        return <div>
                    <p>Sorry, an error occurred attempting to load the data.</p>
                </div>
    }
};