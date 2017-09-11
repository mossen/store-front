import Helmet from 'react-helmet';
import {Images} from 'components';
import {Counter} from 'components';
import {connect} from 'react-redux';
import {add} from 'redux/modules/cart';
import {Row, Col} from 'react-bootstrap/lib';
import React, {Component, PropTypes} from 'react';

class Product extends Component {
    constructor(props){
        super(props)

        this.state = {
            amount: 1
        }

        const products = require('../../../../test/json/products.json')
        this.product = products[this.props.params.productIndex]

        this.handleAddToCart = this.handleAddToCart.bind(this)
    }

    handleAddToCart() {
        const amount = this.state.amount
        const total = this.product.price * amount

        this.props.dispatch(
            add([{
                product: this.product,
                productIndex: parseInt(this.props.params.productIndex),
                amount, total
            }])
        )
    }

    getAmount(amount){
        this.setState({amount})
    }

    render() {
        const s = require('./Product.scss')
        const product = this.product

        return (
            <div className="container">
                <Helmet title={`Product | ${product.title}`}/>
                <div className={s.breadcrumb}>
                    Home / Plates / <span>{product.title}</span>
                </div>
                <Row className={[s.product, "show-grid"].join(' ')}>
                    <Col md={6} mdOffset={1}>
                        <img
                            className={s.thumbnail}
                            src={Images[this.props.params.productIndex]} alt=""
                        />
                    </Col>
                    <Col md={4} className={s.details}>
                        <p className={s.brand}>{product.brand}</p>
                        <h1 className={s.title}>{product.title}</h1>
                        <p className={s.price}>${product.price.toFixed(2)}</p>
                        <p className={s.description}>{product.description}</p>

                        <div className={s.addToCart}>
                            <Counter getCount={this.getAmount.bind(this)}/>
                            <span
                                onClick={() => {
                                    this.handleAddToCart()
                                }}
                                className={[s.btn, "btn"].join(' ')}
                            >
                                add to cart
                            </span>
                        </div>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default connect()(Product);