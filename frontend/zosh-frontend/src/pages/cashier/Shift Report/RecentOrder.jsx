import React from "react";
import { useSelector } from "react-redux";

// const ShiftData = {
//     recentOrders: [
//         {
//             id: 1,
//             createdAt: "01:25 PM",
//             type: "CARD",
//             totalAmount: 599
//         },
//         {
//             id: 2,
//             createdAt: "02:16 PM",
//             type: "CASH",
//             totalAmount: 799
//         }
//     ]
// }
const RecentOrder = () => {
    const { orders } = useSelector((state) => state.order)


    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', margin: '1rem 0' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600' }}>Recent Orders</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Order ID</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Time</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Payment</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '0.75rem' }}>{order.id}</td>
                            <td style={{ padding: '0.75rem' }}>{order.createdAt.split('T')[1].split('.')[0]}</td>
                            <td style={{ padding: '0.75rem' }}>
                                <span style={{
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}>
                                    {order.paymentType}
                                </span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>{order.totalAmount} Rs</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrder;