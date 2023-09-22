import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:5000/",
})

/*export default axios.create({
    baseURL: "http://15.229.39.121:5000/",
})*/