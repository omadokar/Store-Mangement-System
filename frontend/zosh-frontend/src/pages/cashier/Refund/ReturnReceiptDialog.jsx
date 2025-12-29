import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { useSelector } from 'react-redux';


const ReturnReceiptDialog = ({ showReturnReceipt, setShowReturnReceipt, selectedOrder }) => {
    const { products } = useSelector((state) => state.product);
    return (
        <Dialog open={showReturnReceipt} onOpenChange={setShowReturnReceipt}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Return Receipt</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>

                <div className='bg-background max-h-96 overflow-y-auto'>
                    <div className='flex flex-col gap-1'>
                        <h3 className='font-bold text-lg'>D-Mart Pune</h3>
                        <p>123 Main Street, Pune</p>
                        <p>Tel: +1234567890</p>
                    </div>
                    <div className='text-center mb-1'>
                        <h4 className='font-bold'>Return Receipt</h4>
                    </div>
                    <div>
                        <p>Return #: RTN - {Date.now().toString().substring(8)}</p>
                        <p>Original Order #: {selectedOrder.id}</p>
                        <p>DATE: {new Date().toLocaleDateString()}</p>
                        <p>Customer: {selectedOrder?.customer?.fullName}</p>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <h2 className="text-2xl font-bold mt-4">Order Items</h2>
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', margin: '1rem 0' }}>
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
                        </div>
                    </div>
                    <div>
                        <Button><Download />Download Receipt</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReturnReceiptDialog