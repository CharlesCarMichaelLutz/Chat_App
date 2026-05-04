import { useChat }  from "./useChat";
import { baseApi } from "../api/base";

const useRefreshToken = () => {
    const { setAuth } = useChat();

    const refresh = async () => {
        const response = await baseApi.post("refresh-token", {
            withCredentials: true
        })
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        })
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefreshToken