import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signup } from "@/Redux Toolkit/features/Auth/authThunk";
import { toast } from "sonner";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    // NEW: State for form inputs
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    // NEW: Function to print data in console
    const handleLogin = async () => {
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Role:", role);

        const resultAction = await dispatch(signup({ fullName, email, password, role }));
        if (signup.fulfilled.match(resultAction)) {
            toast("Signup Successful");
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">

                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="h-12 w-12 bg-green-900 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                            🛒
                        </div>
                    </div>
                    <h1 className="text-2xl font-semibold">AES System</h1>
                    <p className="text-sm text-gray-500 -mt-2">Create an account</p>
                </div>

                <Card className="shadow-lg border border-gray-200 rounded-2xl">
                    <CardContent className="space-y-5 pt-6">

                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <div className="relative">
                                <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="text"
                                    placeholder="Jhon Doe"
                                    className="pl-11 h-12 rounded-xl"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label>Email Address</Label>
                            <div className="relative">
                                <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className="pl-11 h-12 rounded-xl"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label>Password</Label>
                            <div className="relative">
                                <Lock className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="pl-11 h-12 rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Eye
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Role</Label>
                            <div className="relative">
                                <User className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="text"
                                    placeholder="Enter your role"
                                    className="pl-11 h-12 rounded-xl"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            className="w-full h-12 text-base bg-green-900 hover:bg-green-800 rounded-xl"
                            onClick={handleLogin}  // NEW: send data to console
                        >
                            Sign Up
                        </Button>
                        <div>Alraeady have Account! <Link className="text-green-600" to="/login">Login</Link></div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
