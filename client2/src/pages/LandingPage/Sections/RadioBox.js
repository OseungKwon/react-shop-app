// import React, { useState } from 'react'
// import { Collapse, Radio } from 'antd';
// const { Panel } = Collapse;


// function RadioBox(props) {

//     const [Value, setValue] = useState('0')

//     const renderRadioBox = () => (
//         props.list && props.list.map((value) => (
//             <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
//         ))
//     )

//     const handleChange = (e) => {
//         setValue(e.target.value)
//         props.handleFilters(e.target.value)
//     }

//     return (
//         <div>
//             <Collapse defaultActiveKey={['0']}>
//                 <Panel header="price" key="1">
//                     <Radio.Group onChange={handleChange} value={Value}>

//                         {renderRadioBox()}

//                     </Radio.Group>
//                 </Panel>
//             </Collapse>
//         </div>
//     )
// }

// export default RadioBox
import React, { useState } from 'react'
import { Radio, Collapse } from 'antd'
import { price } from './Datas'
import 'antd/dist/antd.css'
const { Panel } = Collapse;

const RadioBox = (props) => {
    const [Price, setPrice] = useState('0')
    const handleChange = (e) => {
        setPrice(e.target.value);
        props.handleFilter(e.target.value)
    }
    return (
        <Collapse defaultActiveKey={[0]}>
            <Panel header="price">
                <Radio.Group onChange={handleChange} value={Price}>
                    {price.map((value) => (
                        <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
                    ))}
                </Radio.Group>
            </Panel>
        </Collapse>
    )
}

export default RadioBox
