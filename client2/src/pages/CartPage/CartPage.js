import React, { useEffect, useState } from 'react'
import { Result, Empty, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
const CartPage = (props) => {
    const dispatch = useDispatch()
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {

        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then((response) => {
                        if (response.payload.length > 0) {
                            calculateTotal(response.payload)
                        }
                    })
            }
        }

    }, [dispatch, props.user.userData])

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then((response) => {
                if (response.payload.cartDetail.length <= 0) {
                    setShowTotal(false)
                } else {
                    calculateTotal(response.payload.cartDetail)
                }
            })
    }
    return (
        <div style={{ width: '70%', margin: '3rem auto' }}>
            <h1>my cart</h1>
            <UserCardBlock
                products={props.user.cartDetail}
                removeFromCart={removeFromCart}
            />


            {ShowTotal ?
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total amount: ${Total} </h2>
                    <Button type="danger">구매</Button>
                </div>
                :
                ShowSuccess ?
                    <Result
                        status="success"
                        title="Successfully Purchased Items"
                    /> :
                    <div style={{
                        width: '100%', display: 'flex', flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <br />
                        <Empty description={false} />
                        <p>No Items In the Cart</p>

                    </div>
            }
        </div>
    )
}

export default CartPage
