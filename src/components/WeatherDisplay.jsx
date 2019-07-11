import React from 'react';
import { connect } from 'react-redux';

import './WeatherDisplay.css';

import {
    Container,
    Row
} from 'reactstrap';


class WeatherDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.displayDescription = this.displayDescription.bind(this);
    }

    render() {
        return (
            <Container fluid={true} className={`weatherDisplay ${this.props.masking ? 'maskingOn' : 'maskingOff'}`}>
                <Row className='justify-content-center'>
                    <div className={`display-content ${this.props.group}`}>
                        <span className='description'>{this.displayDescription(this.props.tomorrow)}</span>
                        <div className='temp'>{this.props.temp}&deg;<span className='unit'>{this.props.unit=='metric'? 'C' : 'F'}</span></div>
                    </div>
                </Row>
            </Container>
        );
    }

    displayDescription(tomorrow) {
        if(tomorrow) {
            return `Tomorrow: ${this.props.description}`;
        }
        return this.props.description;
    }
}

export default connect(state => {
    return {
        unit: state.cityUnitReducer.unit,
        masking: state.loadMaskReducer.masking
    };
})(WeatherDisplay)
