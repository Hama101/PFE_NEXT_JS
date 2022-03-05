// import axios and create a default instance of axios
import axios from 'axios';
//API routes
import DATABASEURL from './apiRoutes'

const http = axios.create({
    baseURL: DATABASEURL.development,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
});

export default http