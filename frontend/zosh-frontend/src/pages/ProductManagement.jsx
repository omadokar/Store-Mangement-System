import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, getProductsByStoreId, updateProduct } from "../Redux Toolkit/features/Product/productThunk";

const ProductManagement = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user?.storeId) return;
        dispatch(getProductsByStoreId(user?.storeId));
    }, [user?.storeId, dispatch]);
    const { products } = useSelector((state) => state.product)

    const [form, setForm] = useState({
        name: "",
        sku: "",
        sellingPrice: "",
        mrp: "",
        image: "",
        storeId: "",
        categoryId: "",
        description: "",
    });
    const [selectedId, setSelectedId] = useState("");

    const handleCreate = () => {
        console.log("Creating product payload:", form);
        const newProduct = { ...form, id: Date.now() };
        dispatch(createProduct(newProduct));
        setForm({ name: "", sku: "", sellingPrice: "", mrp: "", image: "", storeId: "", categoryId: "", description: "" });
    };

    const handleUpdate = () => {
        if (!selectedId) return;
        console.log("Updating product:", selectedId, "payload:", form);
        dispatch(updateProduct({ id: selectedId, productData: form }));
    };

    const handleDelete = (id) => {
        console.log("Deleting product id:", id);
        dispatch(deleteProduct(id));
    };

    const handleSelect = (product) => {
        setSelectedId(product.id);
        setForm({
            name: product.name,
            sku: product.sku,
            sellingPrice: product.sellingPrice,
            mrp: product.mrp,
            image: product.image,
            storeId: product.storeId,
            categoryId: product.categoryId || "",
            description: product.description || "",
        });
        console.log("Selected product details:", product);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Product Management</h1>
                <p className="text-sm text-gray-600">
                    Placeholder UI for /api/products create, update, delete, and fetch by store/id.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedId ? "Edit Product" : "Create Product"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input
                            placeholder="Product name"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        />
                        <Input
                            placeholder="Image Link"
                            value={form.image}
                            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                        />
                        <Input
                            placeholder="SKU"
                            value={form.sku}
                            onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                        />
                        <Input
                            placeholder="Selling price"
                            type="number"
                            value={form.sellingPrice}
                            onChange={(e) => setForm((f) => ({ ...f, sellingPrice: e.target.value }))}
                        />
                        <Input
                            placeholder="MRP"
                            type="number"
                            value={form.mrp}
                            onChange={(e) => setForm((f) => ({ ...f, mrp: e.target.value }))}
                        />
                        <Input
                            placeholder="Store ID"
                            value={form.storeId}
                            onChange={(e) => setForm((f) => ({ ...f, storeId: e.target.value }))}
                        />
                        <Input
                            placeholder="Category ID"
                            value={form.categoryId}
                            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                        />
                        <Textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleCreate}>Create</Button>
                            <Button variant="outline" onClick={handleUpdate} disabled={!selectedId}>
                                Update
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Actions only console.log payloads; no API integration is wired.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-md p-3 flex items-start justify-between bg-white"
                            >
                                <div>
                                    <div className="font-semibold">{product.name}</div>
                                    <div className="text-xs text-gray-600">SKU: {product.sku}</div>
                                    <div className="text-xs text-gray-600">
                                        Price: {product.sellingPrice} | Store: {product.storeId}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={() => handleSelect(product)}>
                                        View / Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && (
                            <div className="text-sm text-gray-500">No products yet.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProductManagement;

