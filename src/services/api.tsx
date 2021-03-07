import axios from 'axios';
import REMOTE from './endpoints';

export const api = axios.create({
    baseURL: REMOTE.BASE_URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 20000
});
