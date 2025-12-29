import { Badge, ChevronLeftIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByStoreId } from "@/Redux Toolkit/features/Product/productThunk";


const OrderDetailsSection = ({ handleSelectOrder, selectedOrder }) => {
    const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsByStoreId(user.storeId));
    }, [user?.storeId, dispatch]);

    const { products } = useSelector((state) => state.product);
    return (
        <div className="w-1/2 border-r p-4">
            <div className="mb-4">
                <Button onClick={() => handleSelectOrder(null)}><ChevronLeftIcon /> Back to Order</Button>
            </div>
            <Card>
                <CardContent>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2>Order {selectedOrder.id}</h2>
                            <p>Date: {selectedOrder.createdAt.split("T")[0]}</p>
                        </div>
                        <h3>{selectedOrder.type}</h3>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">{selectedOrder?.customer?.fullName}</h3>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">{selectedOrder?.customer?.phone}</h3>
                    </div>
                    <div>
                        <h2 className="font-medium text-sm text-muted-foreground mb-2">Order Summary</h2>
                        <div className="text-sm">
                            <div className="flex justify-between">
                                <span>Total Items: {selectedOrder.orderItems.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Amount: {selectedOrder.totalAmount} Rs</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
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
        </div>
    )
}

export default OrderDetailsSection
