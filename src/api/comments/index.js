export const getComments = (data) => {
    return window.FakerApi.post('/comments', data).catch((response) => response);
}

export const createComment = (data) => {
    return window.FakerApi.post('/comments/create', data).catch((response) => response);
}

export const deleteComment = (data) => {
    return window.FakerApi.delete('/comments/remove', data).catch((response) => response);
} 

export const editComment = (data) => {
    return window.FakerApi.put('/comments/update', data).catch((response) => response);
}