import { CustomerAccordion } from "./CutomerDetails";

export function CustomerManagement() {

    const customers = [
        {
            name: "Aman",
            totalAmount: 100,
            shopName: "Jaldhara Machinery",
            phone: "9876543210",
            address: "Dhamangaon",
            lastPurchaseDate: "2025-11-10",
            products: [
                { name: "Pipe", size: "2 inch", qty: 5, price: 250 },
                { name: "Tap", size: "Medium", qty: 2, price: 150 },
            ]
        },

        {
            name: "Alex",
            totalAmount: 200,
            shopName: "Jaldhara Machinery",
            phone: "8855664411",
            address: "Pune",
            lastPurchaseDate: "2025-11-12",
            products: [
                { name: "Valve", size: "1 inch", qty: 4, price: 150 },
                { name: "Elbow", size: "3 inch", qty: 1, price: 300 },
            ]
        },
    ];

    return (
        <div className="p-6">

            {customers.map((cust, index) => (
                <CustomerAccordion key={index} customer={cust} />
            ))}

        </div>
    );
}
