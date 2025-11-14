
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-3">Jaldhara Supplier</h2>
          <p className="text-gray-400">
            The trusted partner for plumbing materials and water solutions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/bill" className="hover:text-blue-400">Bill Generator</a></li>
            <li><a href="#" className="hover:text-blue-400">Dashboard</a></li>
            <li><a href="/customer-details" className="hover:text-blue-400">Customer Details</a></li>
            <li><a href="/products" className="hover:text-blue-400">Product Details</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-400">📍 Dhamanagaon, Maharashtra</p>
          <p className="text-gray-400">📞 +91 9637847576</p>
          <p className="text-gray-400">📧 info@jaldhara.com</p>

          {/* <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-400">🌐</a>
            <a href="#" className="hover:text-blue-400">🐦</a>
            <a href="#" className="hover:text-blue-400">📘</a>
            <a href="#" className="hover:text-blue-400">📸</a>
          </div> */}
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Jaldhara Supplier — All rights reserved.
      </div>
    </footer>
  );
}
