export const sendCustomerData = async (savedCustomer, selectedProduct, products) => {
  try {
    // selectedCustomer → contains customer name, lastPurchaseDate etc
    // selectedProducts → contains only { name, size, quantity }
    // allProducts → master product list from your database or context
    const getFormattedDate = () => {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, "0");
      const month = today.toLocaleString("en-US", { month: "short" });
      const year = today.getFullYear();

      return `${day} ${month} ${year}`;
    };
    const formattedProducts = selectedProduct.map((item) => {
      const fullProduct = products.find(
        (p) => p.pName === item.name && p.pSize === item.size
      );

      return {
        name: item.name,
        size: item.size,
        price: fullProduct ? fullProduct.pPrice : 0,
        qty: Number(item.quantity),
        finalPrice: fullProduct
          ? (Number(item.quantity) * Number(fullProduct.pFinalPrice)).toFixed(2)
          : 0,
      };
    });

    const customerData = {
      name: savedCustomer,
      lastPurchaseDate: getFormattedDate(),
      products: formattedProducts,
    };

    // Send to backend
    const response = await fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Failed to send customer data");
    }

    alert("Customer data saved successfully");
  } catch (error) {
    console.error(error);
    alert("Error sending customer data");
  }
};