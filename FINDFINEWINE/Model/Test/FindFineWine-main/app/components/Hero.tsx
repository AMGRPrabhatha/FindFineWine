import Image from "next/image";
import wallpaper from "@/app/assets/wallpaper-1.jpg"



const HeroImage = () => {
  return (
    <div className=" relative w-[100%] h-[55vh] md:h-[80vh] bg-gradient-to-r from-indigo-50">
      <Image
        className= "-z-10 object-cover object-center opacity-90 "
        priority
        src={wallpaper}
        fill
        alt="hero image example"
      />

      <div className="relative max-w-7xl flex flex-col mx-auto p-4 h-[90vh]">
        <div className="mt-[15%] z-0 ">
            <h1 className="text-3xl md:text-5xl mb-7 font-basker">Find Your <span className="text-[#6b21a8]">Proper Wines</span> </h1>
            <p className="w-[90%] md:w-[45%] font-normal font-basker-italic text-lg">"Welcome to FindFineWine, where wine lovers find their perfect match! Explore our curated selection of wines tailored to meet your specific preferences and occasions. Whether you're seeking a bold red for a cozy night in or a crisp white to accompany a summer soirée, our platform ensures you discover the ideal bottle to satisfy your wine desires. With expert recommendations, elevate your wine experience with FindFineWine today!"</p>
        </div>
        
      </div>
    </div>
  );
};

export default HeroImage;