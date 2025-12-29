import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductsByStoreId } from "../../Redux Toolkit/features/Product/productThunk";
import { fetchCustomers } from "../../Redux Toolkit/features/Customer/customerThunk";
import { createOrder } from "../../Redux Toolkit/features/Order/orderThunk";
import { logout } from "../../Redux Toolkit/features/User/userThunk";


// const mockProducts = [
//     {
//         id: 1,
//         name: "Men Slim Fit Checkered Spread Collar Casual Shirt (Pack of 2)",
//         sku: "SHRT-S-COTTON-BLACK-2025",
//         price: 799,
//         tag: "men_shirt",
//         image:
//             "https://img.freepik.com/free-photo/close-up-black-shirt-casual_1203-8194.jpg?w=740&q=80",
//     },
//     {
//         id: 2,
//         name: "Men Slim Fit Checkered Spread Collar Casual Shirt (Pack of 2)",
//         sku: "SHRT-S-COTTON-BLACK-2025",
//         price: 799,
//         tag: "men_shirt",
//         image:
//             "https://img.freepik.com/free-photo/close-up-black-shirt-casual_1203-8194.jpg?w=740&q=80",
//     },
//     {
//         id: 3,
//         name: "Men Slim Fit Checkered Spread Collar Casual Shirt (Pack of 2)",
//         sku: "SHRT-S-COTTON-BLACK-2025",
//         price: 799,
//         tag: "men_shirt",
//         image:
//             "https://img.freepik.com/free-photo/close-up-black-shirt-casual_1203-8194.jpg?w=740&q=80",
//     },
//     {
//         id: 4,
//         name: "Men Slim Fit Checkered Spread Collar Casual Shirt (Pack of 2)",
//         sku: "SHRT-S-COTTON-BLACK-2025",
//         price: 899,
//         tag: "men_shirt",
//         image:
//             "https://img.freepik.com/free-photo/close-up-black-shirt-casual_1203-8194.jpg?w=740&q=80",
//     },
// ];

const CreateOrder = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchCustomers());
        if (!user?.storeId) return;
        dispatch(getProductsByStoreId(user.storeId));
    }, [user?.storeId, dispatch]);

    const { products } = useSelector((state) => state.product);
    const { customers } = useSelector((state) => state.customer);

    const mockProducts = products;

    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState("");
    const [notes, setNotes] = useState("");
    const [discountValue, setDiscountValue] = useState(0);
    const [discountType, setDiscountType] = useState("%");


    function addToCart(product) {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(id) {
        setCart((prev) => prev.filter((i) => i.id !== id));
    }

    function updateQuantity(id, q) {
        setCart((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, q) } : i))
                .filter(Boolean)
        );
    }

    function clearCart() {
        setCart([]);
    }



    // Subtotal, tax and totals
    const subtotal = useMemo(
        () => cart.reduce((s, it) => s + it.sellingPrice * it.quantity, 0),
        [cart]
    );

    const discountAmount = useMemo(() => {
        if (!discountValue) return 0;
        if (discountType === "%") {
            return +(subtotal * (Number(discountValue) / 100)).toFixed(2);
        }
        return Number(discountValue || 0);
    }, [discountValue, discountType, subtotal]);

    const total = useMemo(() => +(subtotal - discountAmount).toFixed(2), [
        subtotal,
        discountAmount,
    ]);

    function proceedPayment() {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }

        let selectedCustomer = null;
        if (customer && customer !== "walkin") {
            selectedCustomer = customers.find((c) => String(c.id) === customer);
        }

        const orderData = {
            customer: selectedCustomer,
            paymentType: "CASH",
            orderItems: cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        console.log("Processing Order Payload:", orderData);

        dispatch(createOrder(orderData))
            .unwrap()
            .then(() => {
                alert("Order created successfully!");
                clearCart();
                setCustomer("");
                setNotes("");
                setDiscountValue(0);
            })
            .catch((err) => {
                console.error("Order creation failed:", err);
                alert("Failed to create order: " + (typeof err === "string" ? err : JSON.stringify(err)));
            });
    }

    // small presentational components:
    const ProductCard = ({ p }) => (
        <div
            onClick={() => addToCart(p)}
            className="cursor-pointer group bg-white border rounded-lg p-3 hover:shadow-md transition-shadow"
        >
            <div className="w-full h-36 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                <img
                    src={p.image}
                    alt={p.name}
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="mt-3">
                <div className="text-sm font-medium line-clamp-2">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1">SKU: {p.sku}</div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="text-lg font-semibold text-emerald-600">
                        {p.sellingPrice}
                        <span className="text-sm ml-1 text-emerald-600">Rs</span>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-muted-foreground">
                        {p.tag}
                    </div>
                </div>
            </div>
        </div>
    );

    const CartItem = ({ item }) => (
        <div className="bg-white rounded-lg border p-4 relative flex">
            {/* green left border accent */}
            <div className="w-1 rounded-l-lg bg-emerald-700 mr-3" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.sku}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm">{item.mrp} Rs</div>
                        <div className="text-emerald-600 font-semibold mt-1">
                            {(item.sellingPrice * item.quantity).toFixed(2)} Rs
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1"
                            aria-label="decrease"
                        >
                            <Minus size={14} />
                        </button>
                        <div className="w-10 text-center">{item.quantity}</div>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1"
                            aria-label="increase"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-red-600 p-2"
                        aria-label="delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full min-h-screen flex flex-col bg-slate-50">
            {/* Top header */}
            <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-2 rounded-md bg-emerald-900 text-white">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="inline-block"
                                >
                                    <path
                                        d="M3 6h18M3 12h18M3 18h18"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </SheetTrigger>

                        {/* ==== SIDEBAR CONTENT ==== */}
                        <SheetContent side="left" className="w-72 p-0">

                            {/* Header */}
                            <div className="px-5 py-4 border-b flex items-center justify-between">
                                <h2 className="text-xl font-bold">AES System</h2>
                            </div>

                            {/* Menu */}
                            <div className="p-4 space-y-3">

                                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-emerald-50 text-emerald-900 font-medium">
                                    <Link to="/cashier" className="text-lg">🛒 AES Terminal</Link>
                                </button>

                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md">
                                    <Link to="/cashier/order" className="text-lg">⏱ Order History</Link>
                                </button>

                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md">
                                    <Link to="/cashier/return" className="text-lg">↩️ Returns/Refunds</Link>
                                </button>

                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md">
                                    <Link to="/cashier/customer" className="text-lg">👤 Customers</Link>
                                </button>

                                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md">
                                    <Link to="/cashier/shift" className="text-lg">📄 Shift Summary</Link>
                                </button>
                            </div>
                            {/* Bottom section */}
                            <div className="mt-6 px-4">

                                <button onClick={() => {
                                    dispatch(logout());
                                    navigate("/login");
                                }} className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 border border-red-300 p-2 rounded-md">
                                    🔒 End Shift & Logout
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div>
                        <div className="text-xl font-bold">AES Terminal</div>
                        <div className="text-sm text-muted-foreground">Create new Order</div>
                    </div>
                </div>

                <div
                    onClick={() => navigate("/cashier/profile")}
                    className="flex items-center gap-4 cursor-pointer hover:bg-slate-100 p-2 rounded-lg transition-colors"
                >
                    <div className="text-sm font-medium">Welcome, {user?.fullName}</div>
                    <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-slate-200">
                        <img
                            src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dhzb_cieqA8g8iGYdJ9cnq26poLlUZg3Iw&s"}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>

            <div className="px-6 py-4">
                <h2 className="text-2xl font-bold">Create Order</h2>
            </div>

            <div className="flex-1 overflow-hidden flex gap-4 px-6 pb-6">
                {/* Left: Product search + grid */}
                <div className="w-2/5 h-full overflow-auto">
                    <Card className="h-full">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Input
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1"
                                />
                                <div className="text-sm text-muted-foreground">{mockProducts.length} product founds</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {mockProducts.map((p) => (
                                    <ProductCard key={p.id} p={p} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Middle: Cart column (bigger width as screenshot) */}
                <div className="w-2/5 h-full overflow-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <ShoppingCart size={18} />
                            <div className="font-semibold text-lg">Cart ({cart.length}) item</div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => clearCart()}
                                variant="ghost"
                                className="px-3 py-1 border"
                            >
                                Clear
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {cart.length === 0 && (
                            <div className="text-center text-muted-foreground py-20 border rounded">
                                No items in cart. Click any product to add.
                            </div>
                        )}

                        {cart.map((it) => (
                            <CartItem key={it.id} item={it} />
                        ))}
                    </div>

                    {/* Summary box at bottom */}
                    <div className="mt-6 bg-white border rounded-lg overflow-hidden">
                        <div className="p-4">
                            <div className="flex justify-between py-1">
                                <div className="text-sm text-muted-foreground">Subtotal</div>
                                <div className="font-medium">
                                    {subtotal.toFixed(2)} Rs
                                </div>
                            </div>
                            <div className="flex justify-between py-1 border-t mt-2 pt-2 font-semibold text-lg">
                                <div>Total</div>
                                <div>
                                    {total.toFixed(2)} Rs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Controls / payment */}
                <div className="w-1/5 h-full">
                    <Card className="h-full flex flex-col">
                        <CardContent className="p-4 flex-1 flex flex-col">
                            {/* Customer */}
                            <div className="mb-4">
                                <Label>Customer</Label>
                                <Select value={customer} onValueChange={(v) => setCustomer(v)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="walkin">Walk-in</SelectItem>
                                        {customers.map((c) => (
                                            <SelectItem key={c.id} value={String(c.id)}>
                                                {c.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Discount */}
                            <div className="mb-4">
                                <Label>Discount</Label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        type="number"
                                        value={discountValue}
                                        onChange={(e) => setDiscountValue(e.target.value)}
                                        className="flex-1"
                                        placeholder="0"
                                    />
                                    <div className="flex gap-2 p-1 rounded-md border">
                                        <button
                                            onClick={() => setDiscountType("%")}
                                            className={`px-3 py-1 rounded ${discountType === "%" ? "bg-emerald-900 text-white" : ""}`}
                                        >
                                            %
                                        </button>
                                        <button
                                            onClick={() => setDiscountType("$")}
                                            className={`px-3 py-1 rounded ${discountType === "$" ? "bg-emerald-900 text-white" : ""}`}
                                        >
                                            Rs
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-4">
                                <Label>Note</Label>
                                <Textarea
                                    placeholder="Enter note..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            {/* Big Total */}
                            <div className="mt-auto flex flex-col items-center gap-4">
                                <div className="text-3xl font-bold text-emerald-600">
                                    {total.toFixed(2)}
                                    <span className="text-lg ml-1">Rs</span>
                                </div>
                                <div className="text-sm text-muted-foreground">Total Amount</div>

                                <Button
                                    onClick={proceedPayment}
                                    className="w-full bg-emerald-900 hover:bg-emerald-800"
                                >
                                    Process Payment
                                </Button>

                                <div className="w-full text-center text-xs text-muted-foreground mt-2">
                                    {cart.length} items • {customers.find((c) => String(c.id) === customer)?.fullName || (customer === "walkin" ? "Walk-in" : "No customer selected")}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;
