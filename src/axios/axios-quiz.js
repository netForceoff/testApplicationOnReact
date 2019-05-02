import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quize-5000c.firebaseio.com/'
})