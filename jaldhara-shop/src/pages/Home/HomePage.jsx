import { Header } from "../../component/Header";
import PlumbingImg from "../../assets/images.jpg";
import { Footer } from "../../component/Footer";
import { Carts } from "./Carts";
import { Droplet } from "lucide-react";
export function HomePage() {
    return (
        <>
            <Header />
            <div className="relative w-full h-[35vh] sm:h-[35vh] md:h-[32vh] mt-16 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
                
                <img
                    src={PlumbingImg}
                    alt="plumbing-img"
                    className="w-full h-full object-cover"
                />

                {/* Bottom Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* OVERLAY CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-10 md:px-20 text-center">

                    {/* Lucide Icon */}
                    <Droplet className="w-12 h-12 text-blue-400 drop-shadow-2xl mb-3" />

                    <h3 className="text-xl md:text-4xl font-bold mb-4">
                        JALDHARA MACHINERY AND PLUMBING MATERIAL
                    </h3>

                    <p className="text-lg md:text-2xl mb-2">
                        The trusted partner for quality plumbing solutions
                    </p>

                </div>
            </div>
            <Carts />
            <Footer />
        </>
    );
}