import React from 'react'
import axios from 'axios';
import { Menu, Icon, Badge } from 'antd'
import { useSelector } from 'react-redux'
import { USER_SERVER } from '../Config';
import { withRouter } from 'react-router-dom';

const Topbar = (props) => {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <div style={{ height: '4rem', padding: "0.3rem", borderBottom: "1px solid gray", marginBottom: "2rem" }}>
                <Menu style={{ display: "flex", justifyContent: "center" }}>
                    <Menu.Item key="Main" >
                        <a href="/" style={{ color: "darkcyan", fontWeight: "bold" }}>Main</a>
                    </Menu.Item>
                    <Menu.Item key="Login">
                        <a href="/login">Login</a>
                    </Menu.Item>
                    <Menu.Item key="Register">
                        <a href="/register">Register</a>
                    </Menu.Item>
                </Menu>
            </div>
        )
    } else {
        return (
            <div style={{ height: '4rem', padding: "0.3rem", borderBottom: "1px solid gray", marginBottom: "2rem" }}>
                <Menu style={{ display: "flex", justifyContent: "center" }}>
                    <Menu.Item key="Main" >
                        <a href="/" style={{ color: "darkcyan", fontWeight: "bold" }}>Main</a>
                    </Menu.Item>
                    <Menu.Item key="Upload">
                        <a href="/product/upload">Upload</a>
                    </Menu.Item>
                    <Menu.Item key="Cart" style={{ display: 'flex', alignItems: "flex-end", overflow: "visible" }}>
                        <Badge count={user.userData && user.userData.cart.length} >
                            <a href="/user/cart" style={{ marginRight: -22, color: '#667777' }}>
                                <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 4 }} />
                            </a>
                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="logout">
                        <div onClick={logoutHandler}>Logout</div>
                    </Menu.Item>
                    <Menu.Item style={{ display: "flex", justifyContent: "center", marginLeft: "10rem", fontWeight: "bold", fontSize: "20px" }}>
                        {user.userData && user.userData.name}
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default withRouter(Topbar)
