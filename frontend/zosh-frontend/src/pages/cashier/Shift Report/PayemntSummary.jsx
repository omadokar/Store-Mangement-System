import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOrderByCashierId } from "@/Redux Toolkit/features/Order/orderThunk";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from 'lucide-react';

// const shiftData = {
//     paymentSummary: [
//         {
//             type: "CASH",
//             totalAmount: 5000,
//             transactionCount: 10
//         },
//         {
//             type: "CARD",
//             totalAmount: 2000,
//             transactionCount: 8
//         },
//         {
//             type: "UPI",
//             totalAmount: 8000,
//             transactionCount: 12
//         }
//     ],
//     totalSales: 15000
// }
const PayemntSummary = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        if (!user?.id) return;
        dispatch(getOrderByCashierId(user.id));
    }, [dispatch, user?.id]);

    const paymentSummaryData = useMemo(() => {
        if (!orders || orders.length === 0) return [];
        const summary = {
            CASH: { totalAmount: 0, count: 0 },
            CARD: { totalAmount: 0, count: 0 },
            UPI: { totalAmount: 0, count: 0 },
        };

        let totalSales = 0;

        orders.forEach(order => {
            const type = order.paymentType || "CASH";
            const amount = order.totalAmount || 0;

            if (!summary[type]) {
                summary[type] = { totalAmount: 0, count: 0 };
            }

            summary[type].totalAmount += amount;
            summary[type].count += 1;
            totalSales += amount;
        });

        const summaryArray = Object.keys(summary).map(type => ({
            type,
            totalAmount: summary[type].totalAmount,
            transactionCount: summary[type].count
        }));

        return { summaryArray, totalSales };
    }, [orders]);

    const { summaryArray, totalSales } = paymentSummaryData;

    return (
        <Card>
            <CardContent className={"p-6"}>
                <h2 className='text-xl font-semibold mb-4'>Payment Summary</h2>
                <div className='space-y-4'>
                    {summaryArray?.map((item) => (
                        <div key={item.type} className='flex items-center justify-between mb-4 last:mb-0'>
                            <div className='flex items-center gap-4 w-full'>
                                <div className='flex items-center justify-center bg-secondary h-10 w-10 rounded-full'>
                                    <CreditCard className='h-5 w-5' />
                                </div>
                                <div className='flex-1'>
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>{item.type}</span>
                                        <span className='font-medium'>{item.totalAmount.toFixed(2)} Rs</span>
                                    </div>
                                    <div className='flex justify-between text-sm text-muted-foreground'>
                                        <span>{item.transactionCount} Transactions</span>
                                        <span>{totalSales > 0 ? ((item.totalAmount / totalSales) * 100).toFixed(1) : 0} %</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {summaryArray?.length === 0 && <div className="text-muted-foreground">No transactions found.</div>}
                </div>
            </CardContent>
        </Card>
    );
};

export default PayemntSummary;