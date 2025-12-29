import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Plus, Search, User, Phone, Star, ShoppingBag, CreditCard, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from '../Redux Toolkit/features/Customer/customerThunk';
import { getOrdersByBranch } from '../Redux Toolkit/features/Order/orderThunk';

const CustomerManagement = () => {
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector((state) => state.customer);

    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        dispatch(fetchCustomers());
        if (user?.storeId) {
            dispatch(getOrdersByBranch({ branchId: user.storeId }));
        }
    }, [dispatch, user?.storeId]);

    const getCustomerStats = (customerId) => {
        const customerOrders = orders.filter(order => order.customer?.id === customerId);
        const totalOrders = customerOrders.length;
        const totalSpend = customerOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        return { totalOrders, totalSpend, orders: customerOrders };
    };

    const filteredCustomers = customers.filter(customer =>
        (customer.fullName && customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.phone && customer.phone.includes(searchTerm))
    );

    const handleCustomerSelect = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCustomer) {
                await dispatch(updateCustomer({ id: editingCustomer.id, data: formData })).unwrap();
            } else {
                await dispatch(createCustomer(formData)).unwrap();
            }
            setIsModalOpen(false);
            setEditingCustomer(null);
            setFormData({ fullName: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setFormData({
            fullName: customer.fullName,
            email: customer.email,
            phone: customer.phone
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await dispatch(deleteCustomer(id)).unwrap();
                if (selectedCustomer?.id === id) {
                    setSelectedCustomer(null);
                }
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    const openAddModal = () => {
        setEditingCustomer(null);
        setFormData({ fullName: '', email: '', phone: '' });
        setIsModalOpen(true);
    };

    if (loading && customers.length === 0) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    // if (error) {
    //     return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
    // }

    return (
        <div className="flex h-screen bg-gray-100">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                    <Button onClick={openAddModal}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Customer
                    </Button>
                </header>

                <div className="flex-1 p-6 overflow-hidden">
                    <div className="flex h-full">
                        {/* Customer List */}
                        <div className="w-1/2 pr-4 overflow-y-auto">
                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search customers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                {filteredCustomers.map((customer) => {
                                    const stats = getCustomerStats(customer.id);
                                    return (
                                        <div
                                            key={customer.id}
                                            onClick={() => handleCustomerSelect(customer)}
                                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedCustomer?.id === customer.id
                                                ? 'bg-blue-50 border-blue-200'
                                                : 'bg-white border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center mb-2">
                                                <User className="h-8 w-8 text-gray-400 mr-3" />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{customer.fullName}</h3>
                                                    <p className="text-sm text-gray-600">{customer.phone}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 gap-4 text-sm">
                                                <div className="text-center">
                                                    <div className="font-medium text-gray-900">{customer.loyaltyPoints || 0}</div>
                                                    <div className="text-xs text-gray-500">Loyalty Points</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-medium text-gray-900">{stats.totalOrders}</div>
                                                    <div className="text-xs text-gray-500">Total Orders</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-medium text-gray-900">{stats.totalSpend} Rs</div>
                                                    <div className="text-xs text-gray-500">Total Spend</div>
                                                </div>
                                                <div className="flex justify-center">
                                                    <Star className="h-4 w-4 text-yellow-400" />
                                                    <Star className="h-4 w-4 text-yellow-400" />
                                                    <Star className="h-4 w-4 text-yellow-400" />
                                                    <Star className="h-4 w-4 text-yellow-400" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className="w-1/2 pl-4 border-l border-gray-200">
                            {selectedCustomer ? (() => {
                                const stats = getCustomerStats(selectedCustomer.id);
                                return (
                                    <div className="h-full flex flex-col">
                                        <div className="bg-white p-4 border-b">
                                            <div className="flex items-center">
                                                <User className="h-10 w-10 text-gray-400 mr-4" />
                                                <div>
                                                    <h2 className="text-xl font-bold">{selectedCustomer.fullName}</h2>
                                                    <p className="text-gray-600">{selectedCustomer.phone}</p>
                                                </div>
                                                <div className="ml-auto flex space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleEdit(selectedCustomer)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(selectedCustomer.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto">
                                            {/* Purchase History */}
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-3 flex items-center">
                                                    <ShoppingBag className="h-5 w-5 mr-2" />
                                                    Purchase History
                                                </h3>
                                                <div className="space-y-3">
                                                    {stats.orders && stats.orders.length > 0 ? (
                                                        stats.orders.map((order) => (
                                                            <div key={order.id} className="bg-gray-50 p-3 rounded">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div>
                                                                        <p className="font-medium">
                                                                            Order #{order.id} - {order.orderItems?.length || 0} Items
                                                                        </p>
                                                                        <p className="text-sm text-gray-600">
                                                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date N/A'}
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-semibold">{order.totalAmount} Rs</p>
                                                                        <p className="text-sm text-gray-500">{order.paymentType}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-500 text-sm">No purchase history available.</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Orders Summary */}
                                            <div className="p-4 border-t">
                                                <h3 className="font-semibold mb-3 flex items-center">
                                                    <CreditCard className="h-5 w-5 mr-2" />
                                                    Orders
                                                </h3>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>Total Orders: <span className="font-medium">{stats.totalOrders}</span></div>
                                                    <div>Total Spend: <span className="font-medium">{stats.totalSpend} Rs</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })() : (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    Select a customer to view details
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">
                            {editingCustomer ? 'Edit Customer' : 'Add Customer'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingCustomer ? 'Update' : 'Add'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerManagement;
