import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router";



export default function ResetPassword() {
    const [email, setEmail] = useState("");

    // NEW: Function to print data in console
    const handleLogin = () => {
        console.log("Email:", email);
    };
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">
                {/* Logo + heading */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="h-12 w-12 bg-green-900 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                            🛒
                        </div>
                    </div>
                    <h1 className="text-2xl font-semibold">AES System</h1>
                    <p className="text-gray-600">Reset Password</p>
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
                    </CardContent>


                    <CardFooter className="flex flex-row gap-3">
                        <Button onClick={() => navigate("/cashier/login")} className="w-1/2 h-12 text-base  hover:bg-green-800 rounded-xl">
                            Back to Login
                        </Button>
                        <Button onClick={handleLogin} className="w-1/2 h-12 text-base bg-green-900 hover:bg-green-800 rounded-xl">
                            Send Reset Link
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}