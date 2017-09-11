import Helmet from 'react-helmet';
import {Images} from 'components';
import {Counter} from 'components';
import {connect} from 'react-redux';
import {remove, add} from 'redux/modules/cart';
import {Table} from 'react-bootstrap/lib';
import React, {Component, PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';


class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: 1,
            items: this.props.items
        }
        this.getAmount = this.getAmount.bind(this)
    }

    total = 0
    calculateTotal(price){
        this.total += price
    }

    componentWillReceiveProps(nextProps) {
        this.setState({items: nextProps.items}
            ,()=>{
                console.log(this.state.items);
            }
        )
        this.total = 0
    }

    handleRemove(productIndex) {
        this.props.dispatch(
            remove(productIndex)
        )
    }

    handleAddToCart(item) {
        const amount = this.state.amount
        const total = item.product.price * amount

        this.props.dispatch(
            add([{
                product: item.product,
                productIndex: item.productIndex,
                amount, total
            }])
        )
    }

    getAmount(amount, item){
        this.setState(
            {amount},
            () => {
                this.handleAddToCart(item)
            }
        )
    }

    render() {
        const s = require('./Cart.scss')

        return (
            <div className="container">
                <Helmet title="Cart"/>
                <h1 className={s.header}>Shopping Cart</h1>

                <div className={s.card}>
                    {
                        this.state.items.length <= 0 ? <div className={s.center}>You have not added any item yet.</div> :
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th className={s.center}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.items.map((item, index) => {
                                return <tr className={s.product} key={index}>
                                        <td>
                                            <img src={Images[item.productIndex]} alt="" className={s.thumbnail}/>
                                            <div className={s.detailsWrapper}>
                                                <p className={s.brand}>{item.product.brand}</p>
                                                <p className={s.title}>{item.product.title}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <Counter
                                                returnValues={item}
                                                getCount={this.getAmount}
                                                amount={item.amount}
                                            />
                                        </td>
                                        <td>${item.total.toFixed(2)}</td>
                                        {this.calculateTotal(item.total)}
                                        <td className={s.center}><span
                                            onClick={() => {
                                                this.handleRemove(item.productIndex)
                                            }}
                                            className={s.remove}
                                        >X</span></td>
                                    </tr>
                            })
                            }
                            </tbody>
                        </Table>
                    }
                    <div className={s.tableFooter}>
                        <div className={s.pricing}>
                            <p>cart overview</p>
                            <p>subtotal <span className={s.floatRight}>${this.total.toFixed(2)}</span></p>
                            <p>total <span className={s.floatRight}>${this.total.toFixed(2)} CAD</span></p>
                        </div>
                    </div>
                    <LinkContainer to={'/'}>
                        <a>continue shopping</a>
                    </LinkContainer>
                    <span className={['btn', s.floatRight].join(' ')}>checkout (${this.total.toFixed(2)})</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cart.items
    }
}

export default connect(mapStateToProps)(Cart)
