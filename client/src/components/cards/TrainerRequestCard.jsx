import { Check, X } from "lucide-react";
import moment from "moment";

/* eslint-disable react/prop-types */
const TrainerRequestCard = ({ name, email,date, onApprove, onReject }) => {

  function formatTimeAgo(date) {
    return moment(date).fromNow();
  }
 
  


    return (
      <div className="w-full h-16 flex border-b dark:border-neutral-800 border-neutral-300">
        <div className="w-[60%] flex justify-center pl-3 flex-col">
          <h1 className="font-bold text-base text-neutral-600 dark:text-neutral-400">{name}</h1>
          <h1 className="text-sm text-neutral-600 dark:text-neutral-600">{email}</h1>
          <p className="dark:text-neutral-500 text-[11px] text-neutral-500">{formatTimeAgo(date)}</p>
        </div>
        <div className="md:w-[40%] p-2 flex items-center justify-around">
          <button 
            onClick={onApprove} 
            className="px-4 py-1 rounded-md bg-blue-500 text-white"
          >
            <Check/>
          </button>
          <button 
            onClick={onReject} 
            className="px-4 py-1 rounded-md bg-red-500 text-white"
          >
            <X/>
          </button>
        </div>
      </div>
    );
  };
  
  export default TrainerRequestCard;
  