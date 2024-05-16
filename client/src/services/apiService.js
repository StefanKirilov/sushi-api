const baseUrl = 'http://localhost:3030';

export const getAll = async () => {

    const sushi = await fetch(`${baseUrl}/sushi`);
    const drinks = await fetch(`${baseUrl}/drinks`);
    const sauce = await fetch(`${baseUrl}/sauce`);
    const result1 = await sushi.json();
    const result2 = await drinks.json();
    const result3 = await sauce.json();

    return [...result1, ...result2, ...result3];
};

export const getAllSushi = async () => {

    const response = await fetch(`${baseUrl}/sushi`);
    const result = await response.json();
    return result;
};

export const getAllDrinks = async () => {

    const response = await fetch(`${baseUrl}/drinks`);
    const result = await response.json();
    return result;
};

export const getAllSauce = async () => {

    const response = await fetch(`${baseUrl}/sauce`);
    const result = await response.json();
    return result;
};

export const getOneSushi = async (id) => {

    const response = await fetch(`${baseUrl}/sushi/${id}`);
    const result = await response.json();
    return result;
};

export const getOneDrink = async (id) => {

    const response = await fetch(`${baseUrl}/drinks/${id}`);
    const result = await response.json();
    return result;
};

export const getOneSauce = async (id) => {

    const response = await fetch(`${baseUrl}/sauce/${id}`);
    const result = await response.json();
    return result;
};

export const likeSushi = async (id) => {
    const response = await fetch(`${baseUrl}/sushi/${id}/like`,
        {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        });
    return response;
}

export const unlikeSushi = async (id) => {
    const response = await fetch(`${baseUrl}/sushi/${id}/unlike`,
        {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    return response;
}

export const order = async (data) => {
    const response = await fetch(`${baseUrl}/users/order`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );
    return response;
}

export const postComment = async (data) => {
    const response = await fetch(`${baseUrl}/comments`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );
    return response;
}

export const getAllComments = async () => {

    const response = await fetch(`${baseUrl}/comments`);
    const result = await response.json();
    return result;
};

export const deleteComment = async (id) => {
    const response = await fetch(`${baseUrl}/comments/${id}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response;
}

export const updateComment = async (id, data) => {
    const response = await fetch(`${baseUrl}/comments/${id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );
    return response;
}

export const likeComment = async (id) => {
    const response = await fetch(`${baseUrl}/comments/${id}/like`,
        {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response;
}

export const unlikeComment = async (id) => {
    const response = await fetch(`${baseUrl}/comments/${id}/unlike`,
        {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response;
}