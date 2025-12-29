import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Shield, User, Calendar, MapPin, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    if (!user) {
        return <div className="p-8 text-center">Loading profile...</div>;
    }

    const DetailItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="text-base font-semibold text-slate-900">{value || "N/A"}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="bg-white hover:bg-slate-100"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
                </div>

                {/* Profile Card */}
                <Card className="border-none shadow-md overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600 text-center text-white pt-12 text-3xl">Hello, {user.fullName}</div>
                    <CardContent className="relative pt-0 px-6 pb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-12 mb-6">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
                                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl font-bold">
                                    {user.fullName?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1 mb-2">
                                <h2 className="text-2xl font-bold text-slate-900">{user.fullName}</h2>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                        {user.role}
                                    </Badge>
                                    <span className={`text-sm px-2 py-0.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {user.status || 'ACTIVE'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailItem icon={User} label="Full Name" value={user.fullName} />
                            <DetailItem icon={Mail} label="Email Address" value={user.email} />
                            <DetailItem icon={Phone} label="Mobile Number" value={user.mobile} />
                            <DetailItem icon={Shield} label="Role" value={user.role} />
                            <DetailItem icon={Store} label="Store ID" value={user?.storeId ? `#${user.storeId}` : null} />
                            <DetailItem
                                icon={Calendar}
                                label="Join Date"
                                value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : null}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;
