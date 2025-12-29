import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, BarChart3, Truck, Shield, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-green-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                            🛒
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Welcome to AES System
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Revolutionize your retail business with AES System – the ultimate point-of-sale solution designed for efficiency, scalability, and growth.
                        From small boutiques to large chains, manage everything from inventory to customer relationships in one intuitive platform.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/login">
                            <Button size="lg" className="bg-green-900 hover:bg-green-800 text-white px-8 py-3 rounded-xl text-base font-medium">
                                Get Started - Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="lg" variant="outline" className="border-green-900 text-green-900 hover:bg-green-50 px-8 py-3 rounded-xl text-base font-medium">
                                Create Free Account
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-4 gap-8 mb-16 text-center">
                    <div>
                        <div className="text-3xl font-bold text-green-900 mb-2">10,000+</div>
                        <p className="text-gray-600">Stores Managed</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-green-900 mb-2">500,000+</div>
                        <p className="text-gray-600">Transactions Daily</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-green-900 mb-2">99.9%</div>
                        <p className="text-gray-600">Uptime Guarantee</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-green-900 mb-2">24/7</div>
                        <p className="text-gray-600">Support Available</p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">Powerful Features for Your Business</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="text-center">
                                <ShoppingCart className="h-12 w-12 text-green-900 mx-auto mb-4" />
                                <CardTitle className="text-2xl">Advanced Inventory</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Track stock in real-time across multiple locations. Set low-stock alerts, automate reordering, and optimize your supply chain with intelligent forecasting.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="text-center">
                                <Users className="h-12 w-12 text-green-900 mx-auto mb-4" />
                                <CardTitle className="text-2xl">Customer Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Build detailed customer profiles, segment your audience, and launch targeted loyalty programs. Turn one-time buyers into lifelong customers.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="text-center">
                                <BarChart3 className="h-12 w-12 text-green-900 mx-auto mb-4" />
                                <CardTitle className="text-2xl">Analytics & Reports</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Gain actionable insights with customizable dashboards. Monitor sales trends, employee performance, and operational efficiency to drive data-informed decisions.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="text-center">
                                <Truck className="h-12 w-12 text-green-900 mx-auto mb-4" />
                                <CardTitle className="text-2xl">Multi-Store Support</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Centralize control over all your locations. Sync data across branches, manage centralized purchasing, and maintain brand consistency effortlessly.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="text-center">
                                <Shield className="h-12 w-12 text-green-900 mx-auto mb-4" />
                                <CardTitle className="text-2xl">Secure & Compliant</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Protect your data with enterprise-grade security. PCI DSS compliant payments, role-based access control, and audit trails ensure peace of mind.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="text-center">
                                <Zap className="h-12 w-12 text-green-900 mx-auto mb-4" />
                                <CardTitle className="text-2xl">Lightning Fast</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Experience seamless performance even during peak hours. Our optimized system handles high-volume transactions without compromising speed.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Why Choose Section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Retailers Love Zosh POS</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
                        Join thousands of satisfied customers who have transformed their operations. Zosh POS combines cutting-edge technology with user-friendly design to deliver unmatched value.
                    </p>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-md">
                                <h3 className="text-xl font-medium text-gray-800 mb-3">Seamless Integration</h3>
                                <p className="text-gray-600">
                                    Connect with your favorite accounting software, e-commerce platforms, and third-party apps. Our open API ensures smooth data flow across your ecosystem.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-md">
                                <h3 className="text-xl font-medium text-gray-800 mb-3">Mobile Accessibility</h3>
                                <p className="text-gray-600">
                                    Access your POS system from anywhere. Our responsive design works perfectly on tablets, smartphones, and desktops for on-the-go management.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-md">
                                <h3 className="text-xl font-medium text-gray-800 mb-3">Scalable Solutions</h3>
                                <p className="text-gray-600">
                                    Grow without limits. Whether you're expanding to new locations or increasing transaction volume, Zosh POS scales effortlessly with your business.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-md">
                                <h3 className="text-xl font-medium text-gray-800 mb-3">Expert Support</h3>
                                <p className="text-gray-600">
                                    Our dedicated support team is available 24/7. From setup assistance to advanced troubleshooting, we're here to ensure your success.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">What Our Customers Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border border-gray-200 rounded-2xl p-6">
                            <CardContent>
                                <p className="text-gray-600 italic mb-4">"Zosh POS has completely transformed how we manage our chain of stores. The real-time inventory and analytics have saved us countless hours."</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-white font-medium mr-3">JD</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Jane Doe</p>
                                        <p className="text-sm text-gray-500">Retail Chain Owner</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-200 rounded-2xl p-6">
                            <CardContent>
                                <p className="text-gray-600 italic mb-4">"The customer management features are outstanding. We've increased our repeat business by 35% thanks to the loyalty programs."</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-white font-medium mr-3">MS</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Mike Smith</p>
                                        <p className="text-sm text-gray-500">Boutique Owner</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-200 rounded-2xl p-6">
                            <CardContent>
                                <p className="text-gray-600 italic mb-4">"Setup was a breeze, and the support team is incredibly responsive. Highly recommend for any growing retail business."</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-white font-medium mr-3">AR</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Alex Rivera</p>
                                        <p className="text-sm text-gray-500">Store Manager</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Ready to Transform Your Retail Business?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join the future of retail management today. Start your free trial and experience the difference.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/signup">
                            <Button size="lg" className="bg-green-900 hover:bg-green-800 text-white px-8 py-3 rounded-xl text-base font-medium">
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="outline" className="border-green-900 text-green-900 hover:bg-green-50 px-8 py-3 rounded-xl text-base font-medium">
                                Login Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
