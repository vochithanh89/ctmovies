import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});
const API_KEY = process.env.REACT_APP_API_KEY;

export const axiosGet = async (path, options = { params: {} }) => {
    const myOptions = {
        ...options,
    };
    myOptions.params.api_key = API_KEY;
    const data = await request(path, myOptions);
    return data.data;
};
