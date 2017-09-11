import {Images} from 'components';
import {connect} from 'react-redux';
import {add} from 'redux/modules/cart';
import {remove} from 'redux/modules/cart';
import React, {Component, PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';

class NavbarCart extends Component {
    constructor(props) {
        super(props)
        this.calculateTotal = this.calculateTotal.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

    total = 0

    componentWillReceiveProps() {
        this.total = 0
    }

    calculateTotal(price){
        this.total += price
    }

    handleRemove(productIndex) {
        this.props.dispatch(
            remove(productIndex)
        )
    }

    render() {
        const s = require('./NavbarCart.scss');

        return (
            <div>
                {
                    <div className={s.dropDownCart}>
                        {
                            this.props.items.length <= 0 ? <div>You have not added any item yet.</div> :
                                <div>
                                    <div className={s.scroll}>
                                        { this.props.items.map((item, index) => {
                                            return <div key={index}>
                                                <div className={s.product}>
                                                    <span
                                                        onClick={()=>{this.handleRemove(item.productIndex)}}
                                                        className={s.remove}
                                                    >X</span>
                                                    <img src={Images[item.productIndex]} alt="" className={s.thumbnail}/>
                                                    <p className={s.title}>
                                                        {item.product.title}
                                                        <span className={s.amount}>{'x ' + item.amount}</span>
                                                    </p>
                                                    {this.calculateTotal(item.total)}
                                                    <p className={s.brand}>{item.product.brand}</p>
                                                    <p className={s.price}>${item.product.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        })
                                        }
                                    </div>
                                    <div className={s.cartFooter}>
                                        <div className={s.totalWrapper}>
                                            <p className={s.left}>total</p>
                                            <p className={s.right}>${this.total}</p>
                                        </div>

                                        <LinkContainer to={'/cart'}>
                                            <span className={['btn', s.btnBorder].join(' ')}>view cart</span>
                                        </LinkContainer>
                                        <span className={['btn', s.btn].join(' ')}>checkout</span>
                                    </div>
                                </div>

                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cart.items
    }
}
export default connect(mapStateToProps)(NavbarCart);