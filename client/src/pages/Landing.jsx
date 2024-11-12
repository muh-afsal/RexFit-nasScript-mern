import LandingNavbar from "../components/navbars/LandingNavbar";
import landingBackground from "../assets/images/dubmbellsImage.jpg";
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import singleDumbelImage from "../assets/images/singleDumbellImage.png"

const Landing = () => {
  return (
    <>
      <div className="w-full h-full ">
        <div className="relative h-[600px] w-full bg-black flex justify-center items-center">
          <div
            className="absolute inset-0 "
            style={{
              backgroundImage: `url(${landingBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.3,
            }}
          />
          <div className="absolute inset-0 bg-black opacity-10 dark:opacity-30 z-[-10px]"></div>
          <LandingNavbar />
        </div>
        <div className="w-full h-[600px] absolute top-0  flex items-center justify-center">
          <div className="w-[80%] h-[80%]  md:h-[50%] md:mt-24 mt-9 ">
            <div className="h-[50%] w-full flex  justify-center items-center text-center ">
            <h1 className="font-michroma md:text-5xl text-3xl text-white font-extrabold" >
                Find Your Strength With{" "}
                <span className="text-rex-green">RexFit</span>, Train with
                Professionals
              </h1>
            </div>
            <div className="h-[50%] w-full  flex justify-around flex-col items-center ">
                 <p className="w-[100%] md:w-[50%]  text-center text-neutral-500 font-michroma">Train under a professional trainer and gain strength by understanding your potential. Try out our personal training programs.</p>
                 <div className="flex  gap-4 items-center ">
                 <Link to={'/signup'}><button className="font-michroma bg-rex-green w-[150px] rounded-full h-[38px] text-[12px] font-bold text-black shadow-[0px_0px_27px_0px_#D6FD51]" >START NOW</button></Link>
                   <p className="font-michroma font-semibold text-[12px] flex text-white  gap-1 cursor-pointer">Learn More    <ArrowRight size={18} className="mt-[2px]" /></p>
                 </div>
            </div>
          </div>
        </div>
        <div className="h-[55px] w-full bg-rex-green flex items-center justify-center overflow-auto">
          <h1 className="text-black font-bold font-michroma whitespace-nowrap">
            CONVENIENT LOCATION & SCHEDULES DRAWING UP AN INDIVIDUAL TRAINING
            PROGRAM BY BEST PROFESSIONAL TRAINER AVAILABLE
          </h1>
        </div>
        <div className="h-[450px] w-full dark:bg-dark-bg flex justify-center items-center">
             <div className="lg:w-[70%] md:w-[90%] w-[95%] h-[90%] ">
                 <div className="h-[30%] w-full  items-center flex px-5">
                   <h1 className="font-michroma md:text-5xl text-2xl dark:text-white text-black font-extrabold">Why Choose Us</h1>
                 </div>
                 <div className="h-[70%] w-full flex p-5 gap-5 overflow-auto">
                    <div className="h-full w-1/3  px-8 rounded-xl dark:bg-neutral-900 bg-neutral-200 dark:hover:bg-rex-green hover:text-black transition duration-200 hover:bg-rex-green">
                        <div className="h-[40%] w-full  flex items-center">
                          <img className="w-[150px]  text-center transform rotate-[-20deg]" src={singleDumbelImage} alt="" />
                        </div>
                        <div className="h-[60%] w-full  p-2 flex flex-col justify-between">
                          <h1 className="font-michroma text-lg  font-bold  ">Quality Equipments</h1>
                          <h1 className="font-michroma text-[10px]  ">We Provide Quality Equipments and accessories,we give importance to out clients and their needs.</h1>
                          <p className="font-michroma font-semibold text-[12px] flex   gap-1 cursor-pointer ">Learn More    <ArrowRight size={18} className="mt-[2px]" /></p>
                        </div>
                    </div>
                    <div className="h-full w-1/3  px-8 rounded-xl dark:bg-neutral-900 bg-neutral-200 dark:hover:bg-rex-green hover:text-black  transition duration-200 hover:bg-rex-green">
                        <div className="h-[40%] w-full  flex items-center">
                          <img className="w-[150px]  text-center transform rotate-[-20deg]" src={singleDumbelImage} alt="" />
                        </div>
                        <div className="h-[60%] w-full  p-2 flex flex-col justify-between">
                          <h1 className="font-michroma text-lg  font-bold  ">Professional Trainers</h1>
                          <h1 className="font-michroma text-[10px]  ">We Professional Trainers and their support,we give importance to out clients and their needs.</h1>
                          <p className="font-michroma font-semibold text-[12px] flex   gap-1 cursor-pointer hover:text-black">Learn More    <ArrowRight size={18} className="mt-[2px]" /></p>
                        </div>
                    </div>
                    <div className="h-full w-1/3 px-8 rounded-xl dark:bg-neutral-900 bg-neutral-200 dark:hover:bg-rex-green hover:text-black  transition duration-200 hover:bg-rex-green">
                        <div className="h-[40%] w-full  flex items-center">
                          <img className="w-[150px]  text-center transform rotate-[-20deg]" src={singleDumbelImage} alt="" />
                        </div>
                        <div className="h-[60%] w-full   p-2 flex flex-col justify-between">
                          <h1 className="font-michroma text-lg  font-bold  ">Extra Programms</h1>
                          <h1 className="font-michroma text-[10px]  ">We Provide Extra Programms to Encourage our Clients,Which helps them to achieve their goals.</h1>
                          <p className="font-michroma font-semibold text-[12px] flex   gap-1 cursor-pointer ">Learn More    <ArrowRight size={18} className="mt-[2px]" /></p>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
