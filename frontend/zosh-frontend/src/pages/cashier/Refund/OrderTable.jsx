import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByCashierId } from '@/Redux Toolkit/features/Order/orderThunk';

// const orders = [
//     {
//         id: 1,
//         createdAt: "2023-01-01",
//         customer: {
//             fullName: "John Doe",
//             phone: "1234567890",
//         },
//         totalAmount: 1000,
//         type: "CASH",
//         status: "COMPLETED",
//         items: [
//             {
//                 id: 1,
//                 product: {
//                     image: "https://img.freepik.com/free-photo/shirt_1203-8194.jpg?semt=ais_hybrid&w=740&q=80",
//                     name: "Product 1",
//                     price: 100,
//                     sku: "SHIRT_20230105"
//                 },
//                 quantity: 1,
//             }
//         ]
//     }
// ]
const OrderTable = ({ handleSelectOrder }) => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user?.id) return;
        dispatch(getOrderByCashierId(user?.id));
    }, [user?.id]);
    const { orders } = useSelector((state) => state.order)
    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', margin: '1rem 0' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600' }}>Recent Orders</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Order ID</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Date / Time</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Customer</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Amount</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Payment Type</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                        <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '600' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '0.75rem' }}>{order.id}</td>
                            <td style={{ padding: '0.75rem' }}>{order.createdAt.split("T")[0]}</td>
                            <td style={{ padding: '0.75rem' }}>
                                <span style={{
                                    color: 'black',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.875rem',
                                }}>
                                    {order.customer.fullName}
                                </span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>{order.totalAmount} Rs</td>
                            <td style={{ padding: '0.75rem' }}>{order.paymentType}</td>
                            <td style={{ padding: '0.75rem' }}>{order.status || "DONE"}</td>
                            <td style={{ padding: '0.75rem' }} className='flex justify-end gap-2'>
                                <Button onClick={() => handleSelectOrder(order)} style={{ color: 'white' }}>
                                    Select for Return
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable