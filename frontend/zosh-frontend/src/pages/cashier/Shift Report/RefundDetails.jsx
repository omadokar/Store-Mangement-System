import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRefundsByCashierId } from "@/Redux Toolkit/features/Refund/refundThunk";

const ShiftData = {
    refunds: [
        {
            id: 1,
            orderId: 2,
            reason: "Wrong Product",
            amount: 200
        },
        {
            id: 2,
            orderId: 3,
            reason: "Size Dosen't Matched",
            amount: 500
        }
    ]
}
const RefundDetails = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user?.id) return;
        dispatch(getRefundsByCashierId(user?.id))
    }, [dispatch, user?.id])
    const { refunds } = useSelector((state) => state.refund)
    return (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', margin: '1rem 0' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600' }}>Refund Details</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Refund ID</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Order ID</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Reason</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {refunds?.map((refund, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '0.75rem' }}>RFD - {refund.id}</td>
                            <td style={{ padding: '0.75rem' }}>ORD - {refund.orderId}</td>
                            <td style={{ padding: '0.75rem' }}>
                                <span style={{
                                    color: 'black',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.875rem',
                                }}>
                                    {refund.reason}
                                </span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>{refund.amount} Rs</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RefundDetails;
