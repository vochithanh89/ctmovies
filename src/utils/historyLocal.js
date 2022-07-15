const key = 'history';

export const getHistory = () => {
    return JSON.parse(localStorage.getItem(key)) || [];
};

export const addMovieToHistory = (data) => {
    const history = getHistory();
    const myData = history.filter((movie) => movie.id !== data.id);
    myData.unshift(data);
    localStorage.setItem(key, JSON.stringify(myData));
};

export const clearAllHistory = () => {
    localStorage.setItem(key, JSON.stringify([]));
};
