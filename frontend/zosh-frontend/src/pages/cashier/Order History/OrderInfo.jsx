import React from 'react';
import { Card, CardContent } from "@/components/ui/card";


const OrderInfo = ({ selectedOrder }) => {
    return (
        <div>
            <Card>
                <CardContent className={"p-4"}>
                    <h3 className='font-semibold mb-2'>Order Information</h3>
                    <div className='space-y-1 text-sm'>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Date: </span>
                            <span>{selectedOrder.createdAt.split("T")[0]}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Status: </span>
                            <span className={"capitalize"}>{selectedOrder.status || "DONE"}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Payment Type: </span>
                            <span className={"capitalize"}>{selectedOrder.paymentType}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Total Amount: </span>
                            <span className={"capitalize"}>{selectedOrder.totalAmount} Rs</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderInfo