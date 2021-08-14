// import React, { useState } from 'react'
// import { Checkbox, Collapse } from 'antd'
// import { continents } from './Datas'
// import 'antd/dist/antd.css'
// const { Panel } = Collapse;

// const CheckBox = (props) => {
//     const [Checked, setChecked] = useState([])

//     const handleToggle = (value) => {
//         const currentIndex = Checked.indexOf(value);
//         const newChecked = [...Checked];

//         if (currentIndex === -1) {
//             newChecked.push(value)
//         } else {
//             newChecked.splice(currentIndex, 1)
//         }
//         setChecked(newChecked)
//         props.handleFilters(newChecked);
//     }

//     return (
//         <div>
//             <Collapse defaultActiveKey={['0']}>
//                 <Panel header="Continents" key="1">
//                     {continents.map((value, index) => (
//                         <React.Fragment key={index}>
//                             <Checkbox
//                                 onChange={() => handleToggle(value._id)}
//                                 type="checkbox"
//                                 checked={Checked.indexOf(value._id) === -1 ? false : true} />
//                             <span>{value.name}</span>
//                         </React.Fragment>
//                     ))}
//                 </Panel>
//             </Collapse>
//         </div>
//     )
// }

// export default CheckBox
import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'
import { continents } from './Datas'
import 'antd/dist/antd.css'
const { Panel } = Collapse;

const CheckBox = (props) => {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) => {
        const currentTarget = Checked.indexOf(value);
        const newChecked = [...Checked]

        if (currentTarget === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentTarget, 1)
        }
        setChecked(newChecked)
        props.handleFilter(newChecked)
    }
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="continent">
                    {continents.map((value, index) => (
                        <span key={index} style={{ marginRight: "0.5rem" }} >
                            <Checkbox style={{ marginRight: "0.2rem" }}
                                onChange={() => handleToggle(value._id)}
                                type="checkbox"
                                checked={Checked.indexOf(value._id) === -1 ? false : true}
                            />
                            <span>{value.name}</span>
                        </span>
                    ))}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
