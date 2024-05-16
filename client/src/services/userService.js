const baseUrl = 'http://localhost:3030';

export const login = async (data) => {
    const response = await fetch(
        `${baseUrl}/users/login`,
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
    )

    const result = await response.json();

    return result;
}

export const register = async (data) => {
    const response = await fetch(
        `${baseUrl}/users/register`,
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
    )

    const result = await response.json();
    return result;
}

export const logout = async () => {
    const response = await fetch(
        `${baseUrl}/users/logout`,
        {
            method: 'GET',
        }
    )

    if (response.status === 204) {
        return {};
    };

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}

export const getProfile = async () => {
    const response = await fetch(
        `${baseUrl}/users/profile`,
        {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        });

    if (response.status === 204) {
        return {};
    };

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
  }

  export const editProfile = async (data) => {
    const response = await fetch(
        `${baseUrl}/users/profile`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

    if (response.status === 204) {
        return {};
    };

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }
    
    return result;
  }