import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteEmployee, getAllEmployees, updateEmployee } from "../Redux Toolkit/features/Employee/employeeThunk";

const EmployeeManagement = () => {
    const { user } = useSelector((state) => state.user)
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        role: "",
        storeId: "",
        branchId: "",
    });
    const [selectedId, setSelectedId] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        if (!user?.id) return;
        dispatch(getAllEmployees());
    }, [dispatch, user?.id]);

    const { employees } = useSelector((state) => state.employee)

    const handleUpdate = () => {
        if (!selectedId) return;
        console.log("Updating employee:", selectedId, "payload:", form);
        dispatch(updateEmployee({ employeeId: selectedId, employeeData: form }));
    };

    const handleDelete = (id) => {
        console.log("Deleting employee id:", id);
        dispatch(deleteEmployee(id));
    };

    const handleSelect = (employee) => {
        setSelectedId(employee.id);
        setForm({
            fullName: employee.fullName,
            email: employee.email || "",
            role: employee.role,
            storeId: employee.storeId || "",
            branchId: employee.branchId || "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Employee Management</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Employee</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input
                            placeholder="Full name"
                            value={form.fullName}
                            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                        />
                        <Input
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        />
                        <Select
                            value={form.role}
                            onValueChange={(value) => setForm((f) => ({ ...f, role: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ROLE_ADMIN">ROLE_ADMIN</SelectItem>
                                <SelectItem value="ROLE_STORE_ADMIN">ROLE_STORE_ADMIN</SelectItem>
                                <SelectItem value="ROLE_BRANCH_CASHIER">ROLE_BRANCH_CASHIER</SelectItem>
                                <SelectItem value="ROLE_STORE_MANAGER">ROLE_STORE_MANAGER</SelectItem>
                                <SelectItem value="ROLE_BRANCH_MANAGER">ROLE_BRANCH_MANAGER</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder="Store ID"
                            value={form.storeId}
                            onChange={(e) => setForm((f) => ({ ...f, storeId: e.target.value }))}
                        />
                        <Input
                            placeholder="Branch ID"
                            value={form.branchId}
                            onChange={(e) => setForm((f) => ({ ...f, branchId: e.target.value }))}
                        />
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleUpdate} disabled={!selectedId}>
                                Update
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Payloads are printed to the console instead of calling APIs.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Employees</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {employees.map((employee) => (
                            <div
                                key={employee.id}
                                className="border rounded-md p-3 flex items-start justify-between bg-white"
                            >
                                <div>
                                    <div className="font-semibold">{employee.fullName}</div>
                                    <div className="text-xs text-gray-600">
                                        Role: {employee.role} | Store: {employee.storeId || "-"} | Branch:{" "}
                                        {employee.branchId || "-"}
                                    </div>
                                    <div className="text-xs text-gray-600">{employee.email}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={() => handleSelect(employee)}>
                                        View / Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {employees.length === 0 && (
                            <div className="text-sm text-gray-500">No employees yet.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EmployeeManagement;

