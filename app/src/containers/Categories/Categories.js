import Helmet from 'react-helmet';
import React, {Component} from 'react';
import {Products} from '../../components'

export default class About extends Component {

    state = {
        showKitten: false
    }

    handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

    render() {
        const s = require('./Categories.scss');
        return (
            <div>
                <Helmet title="Categories"/>
                <div className={s.banner}>
                    <div className={[s.plate, s.left].join(' ')}></div>
                    <div className={s.content}>
                        <h1>Plates</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nulla dignissim cursus hendrerit. Donec pulvinar accumsan odio in lacinia.
                        </p>
                    </div>
                    <div className={[s.plate, s.right].join(' ')}></div>
                </div>
                <Products />
            </div>
        );
    }
}
