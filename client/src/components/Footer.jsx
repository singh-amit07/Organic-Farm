export default function Footer() {
  return (
    <footer className="bg-black text-white ">
      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-10">

        
        <div>
          <h2 className="text-2xl font-bold mb-4">
            🌾 Organic Farm
          </h2>
          <p className="text-gray-400">
            Fresh organic vegetables and fruits directly
            from farm to your home.
          </p>
        </div>

        
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Village Farm Road, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ organicfarm@email.com</li>
          </ul>
        </div>

      </div>

      
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Organic Farm. All rights reserved.
      </div>
    </footer>
  );
}
