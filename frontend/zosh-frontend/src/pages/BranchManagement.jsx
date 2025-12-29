import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { createBranch, updateBranch, getAllBranchesByStoreId, deleteBranch } from "../Redux Toolkit/features/Branch/branchThunk";

const BranchManagement = () => {
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState("");
    const [form, setForm] = useState({ name: "", address: "", storeId: "" });
    const [notes, setNotes] = useState("");

    const handleCreate = () => {
        console.log("Creating branch payload:", form);
        const newBranch = { ...form, id: Date.now() };
        dispatch(createBranch(newBranch));
        setForm({ name: "", address: "", storeId: "" });
    };


    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (!user?.storeId) return;
        dispatch(getAllBranchesByStoreId(user?.storeId));
    }, [dispatch, user?.storeId]);
    const { branches } = useSelector((state) => state.branch);

    const handleUpdate = () => {
        console.log(selectedId);
        if (!selectedId) return;
        console.log("Updating branch:", selectedId, "payload:", form);
        dispatch(updateBranch({ id: selectedId, branchData: form }));
    };

    const handleDelete = (id) => {
        console.log("Deleting branch id:", id);
        dispatch(deleteBranch(id));
    };

    const handleSelect = (branch) => {
        setSelectedId(branch.id);
        setForm({ name: branch.name, address: branch.address, storeId: branch.storeId });
        setNotes("");
        console.log("Selected branch details:", branch);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Branch Management</h1>
                    <p className="text-sm text-gray-600">
                        Covers /api/branch create, update, delete, fetch by id and store.
                        All actions log to the console only.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedId ? "Edit Branch" : "Create Branch"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input
                            placeholder="Branch name"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        />
                        <Input
                            placeholder="Store ID"
                            value={form.storeId}
                            onChange={(e) => setForm((f) => ({ ...f, storeId: e.target.value }))}
                        />
                        <Textarea
                            placeholder="Address"
                            value={form.address}
                            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                        />
                        <Textarea
                            placeholder="Notes to log (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleCreate}>Create</Button>
                            <Button variant="outline" onClick={handleUpdate} disabled={!selectedId}>
                                Update
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Form actions will only console.log the payload; no API calls are made.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Branches</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {branches.map((branch) => (
                            <div
                                key={branch.id}
                                className="border rounded-md p-3 flex items-start gap-3 bg-white"
                            >
                                <div className="flex-1">
                                    <div className="font-semibold">{branch.name}</div>
                                    <div className="text-sm text-gray-600">Store: {branch.storeId}</div>
                                    <div className="text-xs text-gray-500">{branch.address}</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button size="sm" onClick={() => handleSelect(branch)}>
                                        View / Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(branch.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {branches.length === 0 && (
                            <div className="text-sm text-gray-500">No branches yet.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BranchManagement;

