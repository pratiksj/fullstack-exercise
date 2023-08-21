import React from 'react'

export const LoginFrom = ({ collection }) => {
    return (
        <form onSubmit={collection.handleLogin}>
            <div>
                username
                <input type="text" value={collection.username} name="Username" onChange={({ target }) => collection.setUsername(target.value)} />

            </div>
            <div>
                password
                <input
                    type="password"
                    value={collection.password}
                    name="Password"
                    onChange={(event) => collection.setPassword(event.target.value)}
                />

            </div>
            <button type="submit">login</button>
        </form>
    )
}

