import {connect} from 'react-redux';
import {add} from 'redux/modules/cart';
import {Images} from 'components';
import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap/lib';
import {LinkContainer} from 'react-router-bootstrap';

class Products extends Component {
    constructor(props) {
        super(props)

        this.handleAddToCart = this.handleAddToCart.bind(this)
    }

    handleAddToCart(product, productIndex, amount = 1) {
        const total = product.price * amount
        this.props.dispatch(
            add([{product, productIndex, amount, total}])
        )
    }

    isItemAddedToCart(productIndex){
        if (this.props.items.length < 0) return false

        for (let i in this.props.items){
            if (this.props.items[i].productIndex == productIndex) return true
        }
        return false
    }

    render() {
        const s = require('./Products.scss');
        const products = require('../../../../test/json/products.json')

        return (
            <Grid>
                <Row className="show-grid">
                    {products.map((product, productIndex) => {
                        return <Col xs={12} md={4} key={productIndex}>
                            <div className={s.item}>
                                <div className={s.imageWrapper}>
                                    <img
                                        className={s.image}
                                        src={Images[productIndex]}
                                        alt=""
                                    />
                                </div>
                                <p className={s.title}>{product.brand}</p>
                                <p className={s.description}>{product.title}</p>
                                <p className={s.price}>${product.price.toFixed(2)}</p>
                                <div className={s.overlay}>
                                    <LinkContainer to={`/product/${productIndex}`} className={[s.btn, "btn"].join(' ')}>
                                        <a className={[s.btn, "btn"].join(' ')}>view details</a>
                                    </LinkContainer>
                                    {
                                        this.isItemAddedToCart(productIndex) ? null :
                                         <span
                                                onClick={() => {
                                                    this.handleAddToCart(product, productIndex)
                                                }}
                                                className={[s.btn, "btn secondary"].join(' ')}
                                            >
                                                add to cart
                                         </span>
                                    }
                                </div>
                            </div>
                        </Col>
                    })}
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cart.items
    }
}
export default connect(mapStateToProps)(Products);