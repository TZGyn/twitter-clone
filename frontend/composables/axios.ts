import axios from 'axios'

const request = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true,
})

export { request }
