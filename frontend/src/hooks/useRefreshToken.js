import axios from "axios";
import useChat  from "./useChat";

const useRefreshToken = () => {
    const { setAuth } = useChat();

    const refresh = async () => {
        const response = await axios.get("refresh-token", {
            withCredentials: true
        })
        setAuth(prev => {
            console.log("prev:", prev);
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        })
        return response.data.accessToken;
    }

  return refresh;
}

export default useRefreshToken