// import React, { useEffect, useState } from 'react'
// import Axios from 'axios'
// import { Icon, Card, Col, Row } from 'antd'
// import CheckBox from './Sections/CheckBox';
// import { continents, price } from './Sections/Datas';
// import RadioBox from './Sections/RadioBox';

// const { Meta } = Card;

// const LandingPage = () => {
//     const [Products, setProducts] = useState([])
//     const [Skip, setSkip] = useState(0)
//     const [Limit, setLimit] = useState(8)
//     const [SearchTerms, setSearchTerms] = useState("")

//     const [Filters, setFilters] = useState({
//         continents: [],
//         price: []
//     })

//     useEffect(() => {

//         const variables = {
//             skip: Skip,
//             limit: Limit,
//         }

//         getProducts(variables)

//     }, [])

//     const getProducts = (variables) => {
//         Axios.post('/api/product/getProducts', variables)
//             .then(response => {
//                 if (response.data.success) {
//                     if (variables.loadMore) {
//                         setProducts([...Products, ...response.data.products])
//                     } else {
//                         setProducts(response.data.products)
//                     }
//                 } else {
//                     alert('Failed to fectch product datas')
//                 }
//             })
//     }

//     const onLoadMore = () => {
//         let skip = Skip + Limit;

//         const variables = {
//             skip: skip,
//             limit: Limit,
//             loadMore: true,
//             filters: Filters,
//             searchTerm: SearchTerms
//         }
//         getProducts(variables)
//         setSkip(skip)
//     }


//     const renderCards = Products.map((product, index) => {

//         return <Col lg={6} md={8} xs={24}>
//             <Card
//                 hoverable={true}
//                 cover={<a href={`/product/${product._id}`} >a</a>}
//             >
//                 <Meta
//                     title={product.title}
//                     description={`$${product.price}`}
//                 />
//             </Card>
//         </Col>
//     })


//     const showFilteredResults = (filters) => {

//         const variables = {
//             skip: 0,
//             limit: Limit,
//             filters: filters

//         }
//         getProducts(variables)
//         setSkip(0)

//     }

//     const handlePrice = (value) => {
//         const data = price;
//         let array = [];

//         for (let key in data) {

//             if (data[key]._id === parseInt(value, 10)) {
//                 array = data[key].array;
//             }
//         }
//         console.log('array', array)
//         return array
//     }

//     const handleFilters = (filters, category) => {

//         const newFilters = { ...Filters }

//         newFilters[category] = filters

//         if (category === "price") {
//             let priceValues = handlePrice(filters)
//             newFilters[category] = priceValues

//         }

//         console.log(newFilters)

//         showFilteredResults(newFilters)
//         setFilters(newFilters)
//     }

//     const updateSearchTerms = (newSearchTerm) => {

//         const variables = {
//             skip: 0,
//             limit: Limit,
//             filters: Filters,
//             searchTerm: newSearchTerm
//         }

//         setSkip(0)
//         setSearchTerms(newSearchTerm)

//         getProducts(variables)
//     }
//     return (
//         <div style={{ width: '75%', margin: '3rem auto', display: 'flex', flexDirection: 'column' }}>
//             <div style={{ textAlign: 'center' }}>
//                 <h2>Let's Travel <Icon type='rocket' /></h2>
//             </div>
//             <Row gutter={[16, 16]}>
//                 <Col lg={12} xs={24} >
//                     <CheckBox
//                         list={continents}
//                         handleFilters={filters => handleFilters(filters, "continents")}
//                     />
//                 </Col>
//                 <Col lg={12} xs={24}>
//                     <RadioBox
//                         list={price}
//                         handleFilters={filters => handleFilters(filters, "price")}
//                     />
//                 </Col>
//             </Row>

//             {Products.length === 0 ? (
//                 <div style={{ display: 'flex', paddingTop: '5rem', alignItems: 'center', justifyContent: 'center' }}>
//                     <h2>No post</h2>
//                 </div>
//             ) : (
//                 <div>
//                     <Row gutter={[16, 16]}>
//                         {renderCards}
//                     </Row>
//                 </div>
//             )}

//         </div>
//     )
// }

// export default LandingPage

import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Icon, Card, Col, Row, Checkbox } from 'antd'
import 'antd/dist/antd.css';
import { continents, price } from './Sections/Datas';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;
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

    const handleFilter = (filters, category) => {
        const newFilters = { ...Filters }
        newFilters[category] = filters

        if (category === "price") {
            for (let key in price) {
                if (price[key]._id === parseInt(filters, 10)) {
                    newFilters[category] = price[key].array;
                }
            }
        }


        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const showFilteredResults = (filters) => {
        const data = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(data)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }

    const onLoadMore = () => {
        let skip = Skip + Limit; // Skip: 0, Limit: 8
        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div>
                <Row gutter={[16, 16]} style={{ marginBottom: "2rem" }}>
                    <Col lg={12} xs={24}>
                        <CheckBox
                            list={continents}
                            handleFilter={filters => handleFilter(filters, "continents")}
                        />
                    </Col>
                    <Col lg={12} xs={24}>
                        <RadioBox
                            list={price}
                            handleFilter={filters => handleFilter(filters, "price")}
                        />
                    </Col>
                </Row>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>
            <div>
                {Products.length === 0 ? (
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', fontSize: '2rem', marginTop: '2rem' }}>
                        No data...
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {Products.map((product) => (<Col lg={6} md={8} xs={24} key={product._id}>
                            <a href="/">
                                <Card>
                                    <Meta
                                        title={product.title}
                                        description={`$${product.price}`}
                                    />
                                </Card>
                            </a>
                        </Col>))}
                    </Row>
                )}

            </div>
            {PostSize >= Limit &&
                <div style={{ width: "100%", display: 'flex', justifyContent: "center", marginTop: "2rem" }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }
        </div>
    )
}

export default LandingPage

