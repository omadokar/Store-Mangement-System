import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { endShift } from "@/Redux Toolkit/features/ShiftReport/shiftReportThunk";
import { useSelector } from "react-redux";

const ShiftReportHeader = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    return (
        <div className="p-4 bg-card border-b">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Shift Report</h1>
                <div className="flex gap-2">
                    <Button variant={"destructive"} onClick={() => dispatch(endShift())}>
                        <ArrowRight />
                        End Shift & Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShiftReportHeader;