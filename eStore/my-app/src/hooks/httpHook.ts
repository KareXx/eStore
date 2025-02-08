import { useCallback } from "react"


type RequestType = {
    url: string;
    method?: string;
    body?: string | undefined;
    headers?: Record<string, string>; 
    credentials?: RequestCredentials;
};
type ResponseData = any;

const useHttp = () => {
    let repeatQuantity = 0;
    const request = useCallback(async (
        {
            url, 
            method = 'GET', 
            body, 
            headers = {"Content-Type": 'multipart/form-data'}, 
            credentials = undefined
        }: RequestType
    ): Promise<ResponseData | { error: string; message: string }> => {
        try{
            // console.log(url, method, body, headers, credentials)
            const response = await fetch(url, 
            {
                method, 
                body, 
                headers,
                credentials: credentials || 'omit'
            })
                
            if(response.status === 401){
                const refreshResponse = await fetch('http://192.168.1.3:5000/refresh', {
                    method: 'GET',
                    credentials: 'include'
                });

                if(!refreshResponse.ok){
                    throw new Error('AUTH_ERROR')
                }
                
                const refreshData = await refreshResponse.json();

                localStorage.setItem('accessToken', refreshData.accessToken);
                if(repeatQuantity < 2){
                    repeatQuantity +=1 
                    return await request({
                        url, 
                        method, 
                        body, 
                        headers: {...headers, "Authorization": `Bearer ${refreshData.accessToken}`},
                        credentials
                    })
                }
                
            }
    
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            return data

        }catch(error){
            throw error;
        }
        
    }, [])

    return {
        request
    }
}

export default useHttp;