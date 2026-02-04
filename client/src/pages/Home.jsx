import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);

  // ✅ Scroll animation JS
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-animate");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove(
              "opacity-0",
              "translate-y-10"
            );
            e.target.classList.add(
              "opacity-100",
              "translate-y-0"
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => obs.observe(el));
  }, []);

  // 🌤 AUTO WEATHER DETECT
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=21a0b980a12c890f05c98518921d5ba7`
        );

        setWeather(res.data);
      } catch {
        console.log("Weather load failed");
      }
    });
  }, []);

  return (
    <div>

      {/* HERO */}
      <div
        className="relative h-[97vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/farme.jpeg')" }}
      >
        <Navbar />

        <div className="h-full flex items-center px-10 pt-20 ml-10 mt-10">
          <div className="mt-100 ml-8">
            <h2 className="text-white text-4xl font-bold mb-4">
              Organic Vegetables and Fruits
            </h2>

            <button
              onClick={() => navigate("/products")}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Shop Now
            </button>

            
            {weather && (
              <div className="mt-4 text-white bg-black/40 px-4 py-2 rounded inline-block gap-5">
                🌤 {weather.name} — {weather.main.temp}°C  
                {" "} {weather.weather[0].main}
              </div>
            )}

          </div>
        </div>
      </div>

      
      <section className="scroll-animate opacity-0 translate-y-10 transition-all duration-700 p-16 bg-green-50">
        <h2 className="text-3xl font-bold mb-6">
          Why Organic Farming 🌿
        </h2>

        <p className="text-lg leading-8">
          Organic farming avoids harmful chemicals and
          keeps soil healthy. We grow food naturally.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="shadow-lg rounded overflow-hidden bg-white">
          <img src="/natural.png"
            className="h-48 w-full object-contain bg-gray-100 p-3" />
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">
              Natural Growing
            </h3>
            <p>Seeds grown without chemicals</p>
          </div>
        </div>

        <div className="shadow-lg rounded overflow-hidden bg-white">
          <img src="/harvesting.jpg"
            className="h-48 w-full object-contain bg-gray-100 p-3" />
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">
              Hand Harvested
            </h3>
            <p>Picked fresh at the right time</p>
          </div>
        </div>

        <div className="shadow-lg rounded overflow-hidden bg-white">
          <img src="/delivery.jpg"
            className="h-48 w-full object-contain bg-gray-100 p-3" />
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">
              Fast Delivery
            </h3>
            <p>Delivered quickly for freshness</p>
          </div>
        </div>

      </div>

      
      <section className="scroll-animate opacity-0 translate-y-10 transition-all duration-700 p-16 bg-green-100">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Health Benefits 🥗
            </h2>

            <ul className="list-disc ml-6 space-y-3 text-lg">
              <li>No chemicals</li>
              <li>Better nutrition</li>
              <li>Fresh taste</li>
              <li>Supports farmers</li>
            </ul>
          </div>

          <div>
            <img src="/health.jpg"
              className="rounded-lg shadow-lg w-full h-72 object-cover" />
          </div>

        </div>
      </section>

      
      <section
        className="scroll-animate opacity-0 translate-y-10 transition-all duration-700 p-20 text-center text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')",
        }}
      >
        <div className="p-10 rounded">
          <h2 className="text-3xl font-bold mb-4 text-black">
            From Our Farm With Care ❤️
          </h2>

          <p className="text-lg text-black">
            Pure food. Honest farming.
          </p>
        </div>
      </section>

      <Footer />

    </div>
  );
}
