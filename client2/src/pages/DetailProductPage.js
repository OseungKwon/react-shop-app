import { Button, Descriptions } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../_actions/user_actions'

const DetailProductPage = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])
    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
                console.log(response)
            })

    }, [productId])
    const addToCartHandler = () => {
        dispatch(addToCart(Product._id))
    }

    return (
        <div style={{ width: "70%", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>{Product.title}</h1>
            </div>
            <div>
                <Descriptions title="Product Info">
                    <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
                    <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                    <Descriptions.Item label="View">{Product.views}</Descriptions.Item>
                    <Descriptions.Item label="Description">{Product.description}</Descriptions.Item>
                    <br />

                </Descriptions>
                <div style={{ display: "flex", marginTop: "4rem" }}>
                    <Button size="large" shape="round" type="danger" onClick={addToCartHandler}>Add to Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default DetailProductPage
