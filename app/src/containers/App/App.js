import config from '../../config';
import Helmet from 'react-helmet';
import {IndexLink} from 'react-router';
import Nav from 'react-bootstrap/lib/Nav';
import React, {Component, PropTypes} from 'react';
import NavItem from 'react-bootstrap/lib/NavItem';
import {LinkContainer} from 'react-router-bootstrap';
import {NavbarCart} from 'components'
import {NavDropdown, MenuItem, Navbar} from 'react-bootstrap/lib';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
    };

    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const {user} = this.props;
        const s = require('./App.scss');
        const logo = require('./logo.png');

        return (
            <div className={s.app}>
                <Helmet {...config.app.head}/>

                <Navbar fixedTop className={s.center}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLink to="/" activeStyle={{color: '#33e0ff'}} className={s.noPadding}>
                                <img src={logo} alt="" className={s.logo}/>
                            </IndexLink>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav navbar className={s.floatNone}>
                            <LinkContainer to="/">
                                <NavItem >Home</NavItem>
                            </LinkContainer>

                            <LinkContainer to="/">
                                <NavItem>Shop</NavItem>
                            </LinkContainer>

                            <LinkContainer to="/">
                                <NavItem>Journal</NavItem>
                            </LinkContainer>

                            <NavDropdown eventKey="4" title="More" id="nav-dropdown">
                                <MenuItem eventKey="4.1">Our products</MenuItem>
                                <MenuItem eventKey="4.2">About us</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="4.4">What's new</MenuItem>
                            </NavDropdown>

                        </Nav>

                        <Nav navbar pullRight>
                            <NavDropdown eventKey="4" title="My Cart" id="nav-dropdown">
                                <NavbarCart />
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

                <main className={s.main}>
                    {this.props.children}
                </main>

            </div>
        );
    }
}
