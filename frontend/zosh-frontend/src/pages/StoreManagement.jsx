import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { createStore, getAllStores, deleteStore, updateStore } from "../Redux Toolkit/features/Store/storeThunk";

const StoreManagement = () => {


    const [form, setForm] = useState({ brand: "", contact: { address: "" }, status: "", storeType: "", description: "" });
    const [selectedId, setSelectedId] = useState("");

    const handleCreate = () => {
        dispatch(createStore(form));
        setForm({ brand: "", contact: { address: "" }, status: "", storeType: "", description: "" });
    };

    const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStores());
    }, [dispatch]);

    const { stores } = useSelector((state) => state.store)

    const handleUpdate = () => {
        if (!selectedId) return;
        dispatch(updateStore({ id: selectedId, storeData: form }));
    };

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteStore(id)).unwrap();
        navigate("/store");

    };

    const handleModerate = (id, status) => {
        console.log("Moderating store:", id, "status:", status);
        dispatch(updateStore({ id, storeData: { status } }));
    };

    const handleSelect = (store) => {
        setSelectedId(store.id);
        setForm({ brand: store.brand, contact: { address: store.contact.address }, status: store.status, storeType: store.storeType, description: store.description });
        console.log("Selected store details:", store);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Store Management</h1>
                <p className="text-sm text-gray-600">
                    Placeholder for /api/store endpoints (create, update, delete, moderate, fetch).
                    Actions only log to the console.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedId ? "Edit Store" : "Create Store"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input
                            placeholder="Store Brand"
                            value={form.brand}
                            onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                        />
                        <Input
                            placeholder="Store Type"
                            value={form.storeType}
                            onChange={(e) => setForm((f) => ({ ...f, storeType: e.target.value }))}
                        />
                        <Input
                            placeholder="Store Description"
                            value={form.description}
                            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        />
                        <Textarea
                            placeholder="Address"
                            value={form.contact.address}
                            onChange={(e) => setForm((f) => ({ ...f, contact: { ...f.contact, address: e.target.value } }))}
                        />
                        <Input
                            placeholder="Status (ACTIVE/PENDING/BLOCKED)"
                            value={form.status}
                            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value.toUpperCase() }))}
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleCreate}>Create</Button>
                            <Button variant="outline" onClick={handleUpdate} disabled={!selectedId}>
                                Update
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            No API calls are wired; payloads go to the console for now.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Stores</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {stores.map((store) => (
                            <div
                                key={store.id}
                                className="border rounded-md p-3 flex items-start justify-between bg-white"
                            >
                                <div>
                                    <div className="font-semibold">{store.brand}</div>
                                    <div className="text-xs text-gray-600">Status: {store.status}</div>
                                    <div className="text-xs text-gray-600">{store.contact.address}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={() => handleSelect(store)}>
                                        View / Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(store.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {stores.length === 0 && (
                            <div className="text-sm text-gray-500">No stores yet.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StoreManagement;

