import React, { useState } from 'react'
import styled from 'styled-components';
import Axios from 'axios';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: 5rem auto;
width: 400px;
`

const UploadForm = styled.form`
display: flex;
flex-direction: column;
min-width: 300px;
    br{
    padding: 0.5rem;
}
`

const Continents = [
    { key: 1, value: 'black' },
    { key: 2, value: 'white' },
    { key: 3, value: 'brown' },
    { key: 4, value: 'gray' },
]


const UploadPage = ({ history }) => {
    const [TitleValue, setTitleValue] = useState('');
    const [DescriptionValue, setDescriptionValue] = useState('');
    const [PriceValue, setPriceValue] = useState(0)
    const [SelectContinent, setSelectContinent] = useState(1);

    const onChangeSelectContinent = e => {
        setSelectContinent(e.currentTarget.value)
    }
    const onChangeDescription = e => {
        setDescriptionValue(e.target.value);
    }
    const onChangeTitle = e => {
        setTitleValue(e.target.value);
    }
    const onChangePrice = e => {
        setPriceValue(e.target.value);
    }
    const onSubmit = e => {
        e.preventDefault();
        const variables = {
            //writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            continents: SelectContinent,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })
    }



    return (
        <>
            <div>Title: {TitleValue}</div>
            <div>Description: {DescriptionValue}</div>
            <div>Price: {PriceValue}</div>
            <div>Select: {SelectContinent}</div>
            <Wrapper>
                <UploadForm onSubmit={onSubmit}>
                    <label>Title</label>
                    <input
                        onChange={onChangeTitle}
                        value={TitleValue} />
                    <br />
                    <label>Description</label>
                    <textarea
                        onChange={onChangeDescription}
                        value={DescriptionValue} />
                    <br />
                    <label>Price($)</label>
                    <input
                        onChange={onChangePrice}
                        value={PriceValue}
                        type='number'
                    />
                    <br />
                    <select
                        onChange={onChangeSelectContinent}
                        value={SelectContinent}>
                        {Continents.map(item => (
                            <option key={item.key} value={item.key}>{item.value} </option>
                        ))}
                    </select >
                    <br />
                    <button
                        onClick={onSubmit}>등록</button>
                </UploadForm>
            </Wrapper>
        </>
    )
}

export default UploadPage
