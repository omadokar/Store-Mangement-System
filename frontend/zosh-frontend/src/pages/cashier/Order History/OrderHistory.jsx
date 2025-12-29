import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import OrderDetails from "./OrderDetails";
import OrderTable from "./OrderTable";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const OrderHistory = () => {
    const [showOrderDetailsDialog, setShowOrderDetailsDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const printRef = useRef(null);

    const handlerViewOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowOrderDetailsDialog(true);
    };

    const formatOrderDateForFile = (dateString) => {
        if (!dateString) return "unknown-date";

        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };


    const handleDownloadPDF = async () => {
        if (!printRef.current) return;

        // 1️⃣ Clone the printable node
        const clone = printRef.current.cloneNode(true);

        // 2️⃣ Force safe styles recursively
        const forceSafeStyles = (node) => {
            if (node.nodeType !== 1) return;

            node.style.background = "#ffffff";
            node.style.color = "#000000";
            node.style.borderColor = "#e5e7eb";
            node.style.boxShadow = "none";

            Array.from(node.children).forEach(forceSafeStyles);
        };

        forceSafeStyles(clone);

        // 3️⃣ Put clone off-screen
        clone.style.position = "fixed";
        clone.style.left = "-10000px";
        clone.style.top = "0";
        clone.style.width = `${printRef.current.offsetWidth}px`;

        document.body.appendChild(clone);

        // 4️⃣ Render canvas
        const canvas = await html2canvas(clone, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
        });

        document.body.removeChild(clone);

        // 5️⃣ Create PDF
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save(
            `Order_${selectedOrder?.id} (${formatOrderDateForFile(selectedOrder?.createdAt)}).pdf`
        );
    };



    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 p-4 overflow-auto">
                <OrderTable handlerViewOrderDetails={handlerViewOrderDetails} />
            </div>

            <Dialog
                open={showOrderDetailsDialog}
                onOpenChange={setShowOrderDetailsDialog}
            >
                <DialogContent className="max-w-4xl">
                    <div ref={printRef} className="pdf-safe bg-white text-black p-6">
                        <DialogHeader>
                            <DialogTitle className="mb-4">
                                Order {selectedOrder?.id} - Invoice
                            </DialogTitle>
                        </DialogHeader>

                        <OrderDetails selectedOrder={selectedOrder} />
                    </div>

                    <DialogFooter>
                        <Button onClick={handleDownloadPDF} className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OrderHistory;
