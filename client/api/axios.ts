import axios from "axios";

const myAxios=axios.create({
    baseURL:process.env.NEXT_PUBLIC_SERVER_URL
})

console.log(process.env.NEXT_PUBLIC_SERVER_URL)

export default myAxios