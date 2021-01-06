import { SyntheticEvent, useRef, useState } from 'react'
import { login, signup } from '../network/httpClient'
import './Auth.css'

interface AuthProps {
    setToken: Function
}

export default function Auth({ setToken }: AuthProps) {
    const [view, setView] = useState('Login')
    const [error, setError] = useState(undefined)
    const userRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    async function authUser(event: SyntheticEvent) {
        event.preventDefault()

        let data;
        if (view === 'Login') {
            data = await login(userRef.current?.value, passRef.current?.value)
        } else {
            data = await signup(userRef.current?.value, passRef.current?.value)
        }

        if (data.token) {
            setToken(data.token)
        } else {
            setError(data.data.message)
        }
    }

    return (
        <div className="authForm">
            <h2 style={{ textAlign: "center", color: "red" }}>
                {error}
                {
                    error &&
                    <span className="errorClose" onClick={() => setError(undefined)}>X</span>
                }
            </h2>
            <div style={{ margin: "3em" }}>
                <button className={view === 'Login' ? 'loginBtn' : 'regBtn'} onClick={() => setView("Login")}>Login</button>
                <button className={view === 'Register' ? 'loginBtn' : 'regBtn'} onClick={() => setView("Register")}>New User?</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <form onSubmit={authUser}>
                    <table style={{ alignSelf: 'center' }}>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="email" >Email </label>
                                </td>
                                <td >
                                    <input ref={userRef} required autoComplete="off" aria-autocomplete="none" name="email" type="email" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="password">Password</label>
                                </td>
                                <td>
                                    <input ref={passRef} required autoComplete="off" aria-autocomplete="none" name="password" type="password" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={2} style={{ textAlign: "center", width: '100%' }}>
                                    <button className='loginBtn' type="submit" >{view}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}