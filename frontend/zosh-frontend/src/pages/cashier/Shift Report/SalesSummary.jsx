import React, { useEffect } from 'react';
import { Card, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByCashierId } from '@/Redux Toolkit/features/Order/orderThunk';
import { getShiftReportsByCashierId } from '@/Redux Toolkit/features/ShiftReport/shiftReportThunk';
import { getRefundsByShiftReport } from '@/Redux Toolkit/features/Refund/refundThunk';

const shiftData = {
    cashier: {
        fullName: "John Doe",
        shiftStartTime: "Dec 9, 2025, 09:00 AM",
        shiftEndTime: "ongoing",
        duration: "9"
    },
    totalOrders: 20,
    totalSales: 10000,
    totalRefunds: 1000,
    netSales: 9000
}
const SalesSummary = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user?.id) return;
        dispatch(getOrderByCashierId(user?.id));
    }, [dispatch, user?.id])
    const { orders } = useSelector((state) => state.order)
    useEffect(() => {
        if (!user?.id) return;
        dispatch(getShiftReportsByCashierId(user?.id))
    }, [dispatch, user?.id])
    const { shiftReports } = useSelector((state) => state.shiftReport)
    useEffect(() => {
        if (!shiftReports?.[0]?.id) return;
        dispatch(getRefundsByShiftReport(shiftReports?.[0]?.id));
    }, [dispatch, shiftReports?.[0]?.id])
    const { refunds } = useSelector((state) => state.refund)
    return (
        <Card>
            <CardHeader>
                <h2 className='text-xl font-semibold mb-2'>Sales Summary</h2>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Total Orders: </span>
                        <span className='font-medium'>{orders?.length}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Total Sales: </span>
                        <span className='font-medium'>{orders?.reduce((total, order) => total + order?.totalAmount, 0)} Rs</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Total Refunds: </span>
                        <span className='font-medium text-red-500'>-{refunds?.reduce((total, refund) => total + refund?.amount, 0)} Rs</span>
                    </div>
                    <div className='flex justify-between border-t'>
                        <span className='text-muted-foreground'>Net Sales: </span>
                        <span className='font-medium'>{orders?.reduce((total, order) => total + order?.totalAmount, 0) - refunds?.reduce((total, refund) => total + refund?.amount, 0)} Rs</span>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default SalesSummary;