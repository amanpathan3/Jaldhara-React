export function Carts() {
    return (
        <>
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl font-bold mb-10 text-gray-800">
                        Manage Your Business with Ease
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Bill Generator */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition duration-300 cursor-pointer">
                            <h3 className="text-xl font-semibold mb-3 text-blue-600">Bill Generator</h3>
                            <p className="text-gray-600 mb-4">
                                Instantly generate customer bills with discounts and tax calculations.
                            </p>
                            <a href="/bill" className="text-blue-600 hover:underline font-medium">
                                Go to Billing →
                            </a>
                        </div>

                        {/* Dashboard */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition duration-300 cursor-pointer">
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Dashboard</h3>
                            <p className="text-gray-600 mb-4">
                                Get insights into your total sales, daily revenue, and top-selling products.
                            </p>
                            <a href="/dashboard" className="text-green-600 hover:underline font-medium">
                                View Dashboard →
                            </a>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition duration-300 cursor-pointer">
                            <h3 className="text-xl font-semibold mb-3 text-purple-600">Product Details</h3>
                            <p className="text-gray-600 mb-4">
                                Manage your product inventory — add, edit, or delete plumbing materials easily.
                            </p>
                            <a href="/products" className="text-purple-600 hover:underline font-medium">
                                Manage Products →
                            </a>
                        </div>

                        {/* Customer Details */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition duration-300 cursor-pointer">
                            <h3 className="text-xl font-semibold mb-3 text-red-600">Customer Records</h3>
                            <p className="text-gray-600 mb-4">
                                Keep track of customer information, past orders, and outstanding payments.
                            </p>
                            <a href="/customer-details" className="text-red-600 hover:underline font-medium">
                                View Customers →
                            </a>
                        </div>
                        {/* Manage Stocks */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition duration-300 cursor-pointer">
                            <h3 className="text-xl font-semibold mb-3 text-teal-600">Customer Records</h3>
                            <p className="text-gray-600 mb-4">
                                Manage your product Stocks — add, edit, or delete products stocks easily.
                            </p>
                            <a href="#" className="text-teal-600 hover:underline font-medium">
                                Manage Stocks →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
