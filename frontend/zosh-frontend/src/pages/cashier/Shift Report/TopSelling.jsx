import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByStoreId } from "@/Redux Toolkit/features/Product/productThunk";

const shiftData = {
    toSellingItems: [
        {
            id: 2,
            name: "R0ADSTER Jacket for Men",
            quantity: 4,
            price: 999
        },
        {
            id: 5,
            name: "R0ADSTER T-Shirt for Men",
            quantity: 9,
            price: 499
        }
    ]
}
const TopSelling = () => {
    const { user } = useSelector((state) => state.user)
    const { orders } = useSelector((state) => state.order)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user?.storeId) return;
        dispatch(getProductsByStoreId(user?.storeId))
    }, [dispatch, user?.storeId])
    const { products } = useSelector((state) => state.product);

    return (
        <Card>
            <CardContent className={"p-6"}>
                <h2 className='text-xl font-semibold mb-4'>Top Selling</h2>
                <div className="space-y-3">
                    {(() => {
                        const itemMap = {};
                        orders?.forEach((order) => {
                            order.orderItems?.forEach((item) => {
                                if (itemMap[item.productId]) {
                                    itemMap[item.productId].quantity += item.quantity;
                                } else {
                                    itemMap[item.productId] = { ...item, quantity: item.quantity };
                                }
                            });
                        });

                        const topSelling = Object.values(itemMap)
                            .sort((a, b) => b.quantity - a.quantity)
                            .slice(0, 5);

                        if (topSelling.length === 0) {
                            return <div className="text-muted-foreground text-sm">No sales data available.</div>;
                        }

                        return topSelling.map((item, index) => {
                            const product = products.find((p) => p.id === item.productId);
                            return (
                                <div key={item.productId} className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 border-b">
                                        <div className="flex justify-between">
                                            <span>{product?.name || `Product #${item.productId}`}</span>
                                            <span>{product?.sellingPrice || item.price} Rs</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{item.quantity} Units Sold</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </CardContent>
        </Card>
    );
};

export default TopSelling;
