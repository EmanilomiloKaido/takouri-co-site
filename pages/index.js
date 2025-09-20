import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition">
        Get Started <FaArrowRight />
      </button>
    </div>
  );
}
