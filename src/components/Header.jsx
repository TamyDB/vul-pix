import { FaMagnifyingGlass, FaHeart, FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import vulpix from '../assets/vulpix.png'

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#B5DCFD]">
      <div className="flex items-center justify-between px-6 py-2">

       
        <a href="#">
          <img
            src={vulpix}
            alt="Vul-pix"
            width={200}
            height={100}
            className="ml-6"
          />
        </a>

        
        <div className="group relative flex items-center w-[60%] mx-auto px-4 py-1.5 bg-[#E0EEFF] border border-[#E0EEFF] rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
          <input
            className="w-full bg-transparent border-none outline-none text-base"
            type="search"
            placeholder="Buscar na loja"
            aria-label="Search"
          />
          <FaMagnifyingGlass className="ml-2.5 text-lg text-[#0072C4] cursor-pointer" />
        </div>

        
        <div className="flex items-center gap-6 mr-6">
          <a href="#" aria-current="page">
            <FaHeart className="text-xl text-[#0072C4]" />
          </a>
          <a href="#">
            <FaCartShopping className="text-xl text-[#0072C4]" />
          </a>
          <a href="#">
            <FaRegUser className="text-xl text-[#0072C4]" />
          </a>
        </div>

      </div>
    </nav>
  );
}