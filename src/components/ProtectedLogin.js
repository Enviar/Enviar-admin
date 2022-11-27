import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export default function ProtectedLogin() {
    const isLogin = localStorage.getItem("access_token")
    if (isLogin) {
        return <Navigate to='/' />
    }

    return <LoginPage />
}

