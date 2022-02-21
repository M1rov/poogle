import axios, {AxiosInstance} from "axios";


const $api: AxiosInstance  = axios.create({
  baseURL: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api',
  headers: {
    'x-rapidapi-key': 'f6ebbfdca5mshec6bdb1f23037a7p18fa38jsnde7b18bf21a4'
  }
})

export default $api;