export const createPost = (data) => {
    return window.FakerApi.post('/posts/create', data).catch((response) => response);
  };
  
export const getPosts = ()  => {
  return window.FakerApi.get('/posts', {}).catch((response) => response);
};

export const deletePost = (data) => {
  return window.FakerApi.delete('/posts/remove', data).catch((response) => response);
}

export const editPost = (data) => {
  return window.FakerApi.put('/posts/update', data).catch((response) => response);
}