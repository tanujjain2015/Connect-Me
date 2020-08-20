//route to get logged in user's info (needs token)

export const getMe = (token) => {
    return fetch ('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

export const createUser = (userData) => {
    return fetch ('/api/users', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
}

export const getUser = (userData) => {
    return fetch ('/api/users', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
}
