import { CustomerAccordion } from "./CutomerDetails";
import { useEffect, useState } from "react";
import { Header } from "../../component/Header";
export function CustomerManagement() {
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch("https://jaldhara-react-1.onrender.com/api/customers");
        const json = await data.json();
        setCustomerDetails(json);
    }

    const refreshCustomers = () => {
        fetchData()
    }
    return (
        <>
            <Header />
            {customerDetails && (
                <div className="p-6 mt-16">
                    {customerDetails.length === 0 ? (
                        <p className="text-center text-gray-600 text-lg font-semibold">
                            No customers found. Add a new customer to get started.
                        </p>
                    ) : (
                        customerDetails.map((cust, index) => (
                            <CustomerAccordion
                                key={index}
                                customer={cust}
                                refreshCustomers={refreshCustomers}
                            />
                        ))
                    )}
                </div>
            )}

        </>
    );
}
