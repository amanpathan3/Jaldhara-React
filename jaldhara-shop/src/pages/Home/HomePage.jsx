import { Header } from "../../component/Header";
import PlumbingImg from "../../assets/plumbing.jpg";
import { Footer } from "../../component/Footer";
import { Carts } from "./Carts";

export function HomePage() {
    return (
        <>
            <Header />
            <div className="relative w-full h-[40vh] sm:h-[40vh] md:h-[60vh] mt-16">
                <img
                    src={PlumbingImg}
                    alt="plumbing-img"
                    className="w-full h-full object-cover brightness-85"
                />



                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-10 md:px-20">
                    <h3 className="text-xl md:text-4xl font-bold mb-4 w-6/12">
                        JALDHARA MACHINERY AND PLUMBING MATERIAL
                    </h3>
                    <p className="text-lg md:text-2xl mb-6">
                        The trusted partner for quality plumbing solutions
                    </p>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold">
                        Explore Now
                    </button>
                </div>
            </div>

            <Carts />
            <Footer />
        </>
    );
}