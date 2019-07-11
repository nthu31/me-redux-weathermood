import React from 'react';
import { connect } from 'react-redux';

import './FutureWeathers.css';


class FutureWeathers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p className={`dateList ${this.props.masking ? 'maskingOn' : 'maskingOff'}`}>
                <span className='date'>{`${this.props.dates[0]}: `}</span>
                <span className='futureTemp'>{this.props.futureTemps[1]}&deg;</span>&nbsp;&nbsp;&nbsp;
                <span className='date'>{`${this.props.dates[1]}: `}</span>
                <span className='futureTemp'>{this.props.futureTemps[2]}&deg;</span>&nbsp;&nbsp;&nbsp;
                <span className='date'>{`${this.props.dates[2]}: `}</span>
                <span className='futureTemp'>{this.props.futureTemps[3]}&deg;</span>&nbsp;&nbsp;&nbsp;
                <span className='date'>{`${this.props.dates[3]}: `}</span>
                <span className='futureTemp'>{this.props.futureTemps[4]}&deg;</span>&nbsp;&nbsp;&nbsp;
            </p>
        );
    }
}

export default connect(state => {
    return {
        masking: state.loadMaskReducer.masking
    };
})(FutureWeathers)
