import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByStoreId } from '@/Redux Toolkit/features/Product/productThunk';

const OrderItemTable = ({ selectedOrder }) => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user?.storeId) return;

        dispatch(getProductsByStoreId(user.storeId));
    }, [user?.storeId, dispatch]);

    const { products } = useSelector((state) => state.product);
    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', margin: '1rem 0' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600' }}>Order Items</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Image</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Item</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Quantity</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Price</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedOrder.orderItems.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '0.75rem' }}><img src={products.find((product) => product.id === item.productId)?.image} style={{ width: '50px', height: '50px' }} /></td>
                            <td style={{ padding: '0.75rem' }}>{products.find((product) => product.id === item.productId)?.name}</td>
                            <td style={{ padding: '0.75rem' }}>{item.quantity}</td>
                            <td style={{ padding: '0.75rem' }}>{item.price} Rs</td>
                            <td style={{ padding: '0.75rem' }}>{item.quantity * item.price} Rs</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default OrderItemTable