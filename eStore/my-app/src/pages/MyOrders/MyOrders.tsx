import { useEffect, useState } from 'react';
import './MyOrders.css';
import useHttp from '../../hooks/httpHook';

type orderType = {
    id: number,
    user_id: number,
    anonymous_user_id: number,
    created_at: string,
    status_id: number
}

const MyOrders = () => {
    const {request} = useHttp()
    const [orders, setOrders] = useState<orderType[]>([])

    useEffect( () => {
        const accessToken = localStorage.getItem('accessToken');
        try{
            const fetchOrders = async () => {
                const orderList = await request({
                    url: 'http://192.168.1.3:5000/order', 
                    method: 'GET', 
                    body: undefined, 
                    headers: {"Authorization": `Bearer ${accessToken}`}, 
                    credentials: 'include'
                });
                console.log(orderList)
                setOrders(orderList);
            } 
            fetchOrders();
        }catch(error){
            console.log(error)
        }
        
    }, [])
    
    return (
        <div className="my-orders">
            {Object.keys(orders).length > 0 ? orders?.map(order => <div>{order.created_at}</div>): 'Null'}
        </div>
    );
}

export default MyOrders;