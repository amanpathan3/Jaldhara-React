import { CustomerAccordion } from "./CutomerDetails";
import { useEffect, useState } from "react";
import { Header } from "../../component/Header";
export function CustomerManagement() {
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch("http://localhost:5000/api/customers");
        const json = await data.json();
        setCustomerDetails(json);
    }

    return (
        <>
            <Header />
            <div className="p-6 mt-16">
                {customerDetails.map((cust, index) => (
                    <CustomerAccordion key={index} customer={cust} />
                ))}

            </div>
        </>
    );
}
