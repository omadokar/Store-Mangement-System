import React from 'react';
import OrderInfo from './OrderInfo';
import CustomerInfo from './CustomerInfo';
import OrderItemTable from './OrderItemTable';

const OrderDetails = ({ selectedOrder }) => {
    return (
        <div>
            <div className='grid grid-cols-2 gap-4 mb-4'>
                <OrderInfo selectedOrder={selectedOrder} />
                <CustomerInfo selectedOrder={selectedOrder} />
            </div>
            <OrderItemTable selectedOrder={selectedOrder} />
        </div>
    )
}

export default OrderDetails