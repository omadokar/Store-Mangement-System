import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { createRefund } from '@/Redux Toolkit/features/Refund/refundThunk';

const returnReason = ["Wrong Product", "Damage Product", "Not Interested", "Other Reason"]
const refundMethod = ["CASH", "CARD", "UPI"]

const ReturnItemSection = ({ selectedOrder, setShowReturnReceipt }) => {
    const dispatch = useDispatch();
    const [returnReasonValue, setReturnReasonValue] = useState("");
    const [otherReason, setOtherReason] = useState("");
    const [refundMethodValue, setRefundMethodValue] = useState("UPI");
    const processRefund = () => {
        const refundData = {
            reason: returnReasonValue,
            amount: selectedOrder.totalAmount,
            paymentType: refundMethodValue,
            orderId: selectedOrder.id,
        }
        dispatch(createRefund(refundData)).then(() => {
            setShowReturnReceipt(true);
        })
    }
    return (
        <div className='p-4 w-1/2'>
            <Card className={"mt-4"}>
                <CardContent className={"p-4"}>
                    <div className='space-y-4'>
                        <div>
                            <Label className={"mb-2 block"}>
                                Return Reason
                            </Label>
                            <Select value={returnReasonValue} onValueChange={(value) => setReturnReasonValue(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Reason..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {returnReason.map((reason) => (
                                        <SelectItem key={reason} value={reason}>
                                            {reason}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {
                            returnReasonValue == "Other Reason" && (
                                <div>
                                    <Label className={"mb-2 block"}>
                                        Specify Reason
                                    </Label>
                                    <Textarea id="other-reason" placeholder="Enter reason..." value={otherReason} onChange={(e) => setOtherReason(e.target.value)} />
                                </div>
                            )
                        }
                        <div>
                            <Label>
                                Refund Method
                            </Label>
                            <Select value={refundMethodValue} onValueChange={(value) => setRefundMethodValue(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Refund Method..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {refundMethod.map((method) => (
                                        <SelectItem key={method} value={method}>
                                            {method}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='pt-5 border-t'>
                            <div className='flex justify-baseline text-lg font-semibold'>
                                <span>Total Refund Amount:  </span>
                                <span>{selectedOrder.totalAmount} Rs</span>
                            </div>
                            <Button onClick={processRefund} className="w-full py-6 mt-5">Proceed Refund</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ReturnItemSection