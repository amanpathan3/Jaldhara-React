import { useState } from "react";

export function CustomerDetails({setSavedCustomer}) {
    const [customerName, setCustomerName] = useState("");
    const handleSaveCustomer = () => {
        if (customerName.trim()) {
            setSavedCustomer(customerName);
            setCustomerName("");
        }
    };
    return (
        <>
            {/* Customer Section */}
            <div className="space-y-3">
                <label className="font-medium text-gray-700">Customer Name:</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <input
                        type="text"
                        placeholder="Enter Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/2"
                    />
                    <button
                        onClick={handleSaveCustomer}
                        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                    >
                        Save
                    </button>
                </div>
                {/* {savedCustomer && (
              <p className="text-green-700 font-medium">Customer: {savedCustomer}</p>
            )} */}
            </div>
        </>
    );
}