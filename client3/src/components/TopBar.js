import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const TopBarBox = styled.div`
    height: 3rem;
    border-bottom: 3px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const LeftSide = styled.div`
    margin-left: 2rem;
    &>a{
        font-size: 1.5rem;
        font-weight: bold;
        text-decoration: none;
        display: flex;
        align-items: center;
        color: gray;
        
        &>div{
            color: black;
            margin-right: 0.5rem;
        }
    }
`
const RightSide = styled.div`
    margin-right: 3rem;
    &>a{
        margin-left: 1rem;
        text-decoration: none;
        font-size: 1rem;
        color: #0078ff;
        font-weight: bold;
        &:hover{
            color: gray;
        }
    }
`

const TopBar = (props) => {
    const user = useSelector(state => state.user)
    console.log(user)
    return (
        <TopBarBox>
            <LeftSide>
                <Link to="/"><div>Jamong </div>shop</Link>
            </LeftSide>
            <RightSide>
                {(user.userData && user.userData.isAuth) ? (
                    <>
                        <Link to="/product/upload">Upload</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

            </RightSide>
        </TopBarBox>
    )
}

export default withRouter(TopBar);
