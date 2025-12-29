import React, { useEffect } from 'react';
import { Card, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from 'react-redux';
import { getShiftReportsByCashierId } from '@/Redux Toolkit/features/ShiftReport/shiftReportThunk';


const ShiftInfo = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user?.id) return;
        dispatch(getShiftReportsByCashierId(user?.id))
    }, [dispatch, user?.id])
    const { shiftReports } = useSelector((state) => state.shiftReport)
    const shift = shiftReports?.find(
        (s) => s?.cashierId === user?.id
    );

    const durationInHours = shift
        ? (
            (new Date(shift.shiftEndTime) - new Date(shift.shiftStartTime)) /
            (1000 * 60 * 60)
        ).toFixed(2)
        : null;

    return (
        <Card>
            <CardHeader>
                <h2 className='text-xl font-semibold mb-2'>Shift Info</h2>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Cashier: </span>
                        <span className='font-medium'>{user.fullName}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Shift Start Time: </span>
                        <span className="font-medium">
                            {shiftReports
                                ?.find((s) => s?.cashierId === user?.id)
                                ?.shiftStartTime &&
                                new Date(
                                    shiftReports.find((s) => s?.cashierId === user?.id).shiftStartTime
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Shift End Time: </span>
                        <span className="font-medium">
                            {shiftReports
                                ?.find((s) => s?.cashierId === user?.id)
                                ?.shiftStartTime &&
                                new Date(
                                    shiftReports.find((s) => s?.cashierId === user?.id).shiftStartTime
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Duration: </span>
                        <span className='font-medium'>{durationInHours} Hrs</span>

                    </div>
                </div>
            </CardHeader>
        </Card >
    );
};

export default ShiftInfo;
