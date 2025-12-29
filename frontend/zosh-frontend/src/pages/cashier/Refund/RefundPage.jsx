import React from 'react';
import OrderTable from './OrderTable';
import OrderDetailsSection from './OrderDetailsSection';
import ReturnItemSection from './ReturnItemSection';
import { useState } from 'react';
import ReturnReceiptDialog from './ReturnReceiptDialog';

const RefundPage = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showReturnReceipt, setShowReturnReceipt] = useState(false);
    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
    }
    return (
        <div className='h-full flex flex-col'>
            <div className='p-4 bg-card border-b'>
                <h1 className='text-2xl font-bold'>Return/Refund</h1>
            </div>
            <div className='flex-1 overflow-hidden'>
                {!selectedOrder ? (<OrderTable handleSelectOrder={handleSelectOrder} />) : <div className='flex'>
                    <OrderDetailsSection handleSelectOrder={handleSelectOrder} selectedOrder={selectedOrder} />
                    <ReturnItemSection selectedOrder={selectedOrder} setShowReturnReceipt={setShowReturnReceipt} />
                </div>}
            </div>

            {selectedOrder && <ReturnReceiptDialog showReturnReceipt={showReturnReceipt} setShowReturnReceipt={setShowReturnReceipt} selectedOrder={selectedOrder} />}
        </div>
    )
}

export default RefundPage