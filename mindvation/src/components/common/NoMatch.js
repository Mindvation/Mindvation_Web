import React, {Component} from 'react';

class NoMatch extends Component {

    render() {
        return <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '5em'
        }}>Page Not Found</div>;
    }
}

export default NoMatch;