import React from 'react';
import ShiftInfo from './ShiftInfo';
import SalesSummary from './SalesSummary';
import PayemntSummary from './PayemntSummary';
import TopSelling from './TopSelling';
import RecentOrder from './RecentOrder';
import RefundDetails from './RefundDetails';
import ShiftReportHeader from './ShiftReportHeader';

const ShiftSummary = () => {
    return (
        <div className='h-full flex flex-col'>
            <ShiftReportHeader />
            <div className='flex-1 overflow-auto p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <ShiftInfo />
                    <SalesSummary />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <PayemntSummary />
                    <TopSelling />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <RecentOrder />
                    <RefundDetails />
                </div>
            </div>
        </div>
    );
};

export default ShiftSummary;