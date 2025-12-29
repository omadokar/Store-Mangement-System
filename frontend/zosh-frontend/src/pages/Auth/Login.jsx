import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "@/Redux Toolkit/features/Auth/authThunk";
import { toast } from "sonner";
import { getUser } from "@/Redux Toolkit/features/User/userThunk";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    // NEW: State for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // NEW: Function to print data in console
    const handleLogin = async () => {
        console.log("Email:", email);
        console.log("Password:", password);

        const resultAction = await dispatch(login({ email, password }));
        if (login.fulfilled.match(resultAction)) {
            toast("Login Successful");
            const user = resultAction.payload.user;
            dispatch(getUser(resultAction.payload.jwt));
            console.log("user", user);
            if (user?.role === "ROLE_BRANCH_CASHIER") {
                navigate("/cashier");
            }
            else if (user?.role === "ROLE_STORE_MANAGER" || user?.role === "ROLE_STORE_ADMIN") {
                navigate("/store");
            }
            else if (user?.role === "ROLE_BRANCH_MANAGER") {
                navigate("/branch");
            } else if (user?.role === "ROLE_ADMIN") {
                navigate("/employee");
            }
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
                    <p className="text-gray-600">Welcome Back</p>
                    <p className="text-sm text-gray-500 -mt-2">Sign in to your account to continue</p>
                </div>

                <Card className="shadow-lg border border-gray-200 rounded-2xl">
                    <CardContent className="space-y-5 pt-6">

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

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="cursor-pointer">Remember me</Label>
                            </div>

                            <button
                                onClick={() => navigate("/cashier/reset-password")}
                                className="text-green-900 hover:underline font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            className="w-full h-12 text-base bg-green-900 hover:bg-green-800 rounded-xl"
                            onClick={handleLogin}  // NEW: send data to console
                        >
                            Sign In
                        </Button>
                        <Button onClick={() => navigate("/signup")} className="w-full h-12 text-base hover:bg-green-800 rounded-xl">
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
