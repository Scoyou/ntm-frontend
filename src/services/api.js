import Axios from "axios";

let urls = {
    development: 'http://localhost:3001/',
    production: 'https://task-management-backend-sy.herokuapp.com/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;