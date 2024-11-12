import RexFitLogo from "../common/RexFitLogo"
import ThemeToggle from "../common/ThemeToggle"

const LandingNavbar = () => {
  return (
   
        <header className="h-[80px] absolute w-full  flex items-center top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex justify-around items-center w-full mr-6 text-white">
          <RexFitLogo />

          <nav className=" flex gap-6 md:gap-24 justify-center ">
            <ul className="flex space-x-2 font-semibold text-sm">
             Home 
            </ul>
            <ul className="flex space-x-2 font-semibold text-sm">
             Contact Us 
            </ul>
            <ul className="flex space-x-2 font-semibold text-sm">
             About 
            </ul>
          </nav>
        <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default LandingNavbar
