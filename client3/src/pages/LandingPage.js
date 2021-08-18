import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import { rest } from 'lodash'
import { Button } from '../components/AuthForm'

const Wrapper = styled.div`
    margin: 3rem auto;
    width: 70%;
`
const ProductsBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    @media screen and (max-width:1000px){
        grid-template-columns: repeat(3,1fr);
    }
    @media screen and (max-width:750px){
        grid-template-columns: repeat(2,1fr);
    }
    @media screen and (max-width:480px){
        grid-template-columns: repeat(1,1fr);
    }
    &>div{
        border: 1px solid #d3d3d3;
        border-radius: 5px;
        padding: 2rem;
        margin: 0.5rem;
    }
`
const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const Title = styled.div`
    font-weight: 500;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
`

const Sub = styled.div`

`


const LandingPage = () => {
    const [Products, setProducts] = useState("")
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")


    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)

    }, [Skip, Limit])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit; // Skip: 0, Limit: 8
        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        }
        getProducts(variables)
        setLimit(skip)
    }

    return (
        <Wrapper>
            {Products.length === 0 ? (
                <div>No data</div>
            ) : (
                <ProductsBlock>
                    {Products.map((product) => (
                        <ProductCard key={product._id}>
                            <Title>{product.title}</Title>
                            <Sub>{product.price} $</Sub>
                        </ProductCard>
                    ))}
                </ProductsBlock>
            )}
            <div>
                {PostSize >= Limit &&
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", marginTop: "2rem" }}>
                        <Button onClick={onLoadMore} style={{ maxWidth: "10rem", background: "rgba(0,12,255,0.3)" }}>더보기</Button>
                    </div>
                }
            </div>
        </Wrapper>
    )
}

export default LandingPage
