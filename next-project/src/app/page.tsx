import Link from "next/link";

const app = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 font-sans text-blue">
      <nav className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-4 md:p-6 mb-12 w-full max-w-md">
        <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <li className="text-lg font-semibold hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link href='/carousel'> Carousel </Link>
          </li>
          <li className="text-lg font-semibold hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link href='/debounce'> Debounce </Link>
          </li>
        </ul>
      </nav>
  
      <div className="text-center text-lg text-white mt-8">
        <p>Click on the navigation links above to explore!</p>
      </div>
    </div>
  );
}

export default app;
