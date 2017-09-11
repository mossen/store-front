import React, {Component, PropTypes} from 'react';


export default class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: this.props.amount || 1
        }

        this.handleDecrease = this.handleDecrease.bind(this)
        this.handleIncrease = this.handleIncrease.bind(this)
    }

    static PropTypes = {
        getCount: PropTypes.func,
        amount: PropTypes.number
    }

    static defaultProps = {
        getCount: ()=>{},
    }

    handleIncrease() {
        this.setState(
            {amount: this.state.amount + 1},
            () => {
                this.props.getCount(this.state.amount, this.props.returnValues || null)
            }
        )
    }

    handleDecrease() {
        let amount = this.state.amount - 1
        if (this.state.amount <= 1) amount = 1
        this.setState(
            {amount},
            () => {
                this.props.getCount(this.state.amount, this.props.returnValues || null)
            }
        )
    }


    render() {
        const s = require('./Counter.scss');

        return (
            <div className={s.counter}>
                <span className={s.amount}>{this.state.amount}</span>
                <div className={s.btnWrapper}>
                        <span
                            onClick={this.handleIncrease}
                            className={[s.counterBtn, s.increase, "fa fa-plus"].join(' ')}
                            aria-hidden="true"
                        ></span>
                    <span
                        onClick={this.handleDecrease}
                        className={[s.counterBtn, s.decrease, "fa fa-minus"].join(' ')}
                        aria-hidden="true"
                    ></span>
                </div>
            </div>
        );
    }
}
