import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Icon, Card, Col, Row } from 'antd'
const { Meta } = Card;

const LandingPage = () => {
    const [Products, setProducts] = useState([])
    console.log(Products)
    useEffect(() => {
        Axios.post('/api/product/getProducts')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products)
                } else {
                    alert('Failed to fetch')
                }
            })
    }, [])

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                hoverable={true}
                cover
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel <Icon type='rocket' /></h2>
            </div>

            {Products.length === 0 ? (
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post</h2>
                </div>
            ) : (
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            )}

        </div>
    )
}

export default LandingPage
