import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import './Main.css';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {
    todayWeatherReducer,
    forecastWeatherReducer,
    cityUnitReducer,
    loadMaskReducer
} from 'reducers/reducer.js';


import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarToggle: false
        };
        this.store = null;
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            todayWeatherReducer,
            forecastWeatherReducer,
            cityUnitReducer,
            loadMaskReducer
        }), composeEnhancers(applyMiddleware(thunkMiddleware)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className='main'>
                        <div className='container-fluid'>
                            <Navbar color='white' light>
                                <NavbarToggler className='navbarToggler' onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='brand text-info' href="/">WeatherMood</NavbarBrand>
                                <Collapse isOpen={this.state.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem className='navItem'>
                                            <NavLink tag={Link} to='/'>Today</NavLink>
                                        </NavItem>
                                        <NavItem className='navItem'>
                                            <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>

                        <Route exact path='/' render={() => (
                            <Today />
                        )} />
                        <Route exact path='/forecast' render={() => (
                            <Forecast />
                        )} />
                    </div>
                </Router>
            </Provider>
        );
    }

    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }
}
