export const isAuthor = (user_id) => {
    return user_id === JSON.parse(window.localStorage.auth).id;
}