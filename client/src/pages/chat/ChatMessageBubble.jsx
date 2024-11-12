import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { IMessage } from "@/types/IChat";
import { Copy, Star, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { MdInsertDriveFile } from "react-icons/md";
import { toast } from 'react-toastify';

interface ChatMessageBubbleProps {
  isSender: boolean;
  message: IMessage;
  sender:string;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  isSender,
  message,
  sender
}) => {
  const [isMoreOption, setIsMoreOptions] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

// General API call function with action parameter
const handleAction = async (action: "copy" | "star" | "delete") => {
  try {
    // const response = await fetch(`/api/message/${message._id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ action }),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to perform action");
    // }

    if (action === "copy") {
      navigator.clipboard.writeText(message.content);
    } else if (action === "star") {
      toast.success("The Message Starred Successfully",);
    } else if (action === "delete") {
      toast.success("The Message hass Deleted Successfully");
    }
  } catch (error) {
    console.error("Error performing action:", error);
  }
};




  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
        setIsMoreOptions(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownVisible]);

  const handleConfirm = () => {
    // Handle confirm logic here
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  function formatTime(dateString: string | number | Date) {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  const getMediaElement = (type: string, url: string) => {
    switch (type) {
      case "image":
        return (
          <>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={url}
                alt="Message"
                className="w-60 h-60 object-cover rounded-lg mr-[-10px] mb-3"
              />
            </a>
          </>
        );
      case "video":
        return (
          <>
            <video
              src={url}
              controls
              className="w-60 h-60 rounded-lg mb-3 mr-[-10px] "
            />
          </>
        );
      case "audio":
        return (
          <>
            <audio
              controls
              className="w-[250px] h-[50px]  rounded-lg  mb-2 py-1 px-2"
            >
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </>
        );
      case "document":
        return (
          <>
            <a
              href={`https://docs.google.com/viewer?url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex text-white ${
                isSender ? "bg-blue-500" : "bg-neutral-400 dark:bg-neutral-700"
              }  dark:text-white items-center py-6 px-6 mb-4 border-neutral-300 border dark:border-neutral-600 rounded-lg justify-center`}
            >
              <MdInsertDriveFile size={24} />
              <span className="ml-2 hover:underline">View Document</span>
            </a>
          </>
        );
      default:
        return null;
    }
  };

  const handleMouseEnterMessage = () => {
    if (!isDropdownVisible) {
      setIsMoreOptions(true);
    }
  };

  const handleMouseLeaveMessage = () => {
    if (!isDropdownVisible) {
      setIsMoreOptions(false);
    }
  };

  const handleClickMoreOption = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    
   
    
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3 `}>
      <div className="relative  flex flex-col">
      {(isMoreOption || isDropdownVisible) && (
          <div
            className={`absolute z-50 ${
              isSender ? "left-[-25px]" : "right-[-25px]"
            }`}
          >
            <IoMdMore
              onMouseEnter={handleMouseEnterMessage}
              onMouseLeave={handleMouseLeaveMessage}
              size={25}
              className="text-gray-500 hover:cursor-pointer"
              onClick={handleClickMoreOption}
            />
            <div
              id="dropdownDots"
              ref={dropdownRef}
              className={`absolute z-50 ${
                isSender ? "left-0" : "right-0"
              } mt-2 w-40 px-2 bg-white divide-y divide-gray-100 rounded-lg dark:bg-neutral-700 dark:divide-neutral-600 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
                isDropdownVisible ? "" : "hidden"
              }`}
              aria-labelledby="dropdownMenuIconButton"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <p
                   onClick={() => handleAction("copy")}
                    className="flex items-center cursor-pointer px-4 py-2 hover:bg-neutral-100 rounded-md dark:hover:bg-neutral-600 dark:hover:text-white"
                  >
                   <Copy  size={15} className="mr-3"/> Copy
                  </p>
                  <p
                    className=" px-4 flex py-2 hover:bg-neutral-100  cursor-pointer rounded-md dark:hover:bg-neutral-600 items-center dark:hover:text-white"
                  >
                  <Star size={15}  onClick={() => handleAction("star")}  className="mr-3"/>  Star
                  </p>
                  <p
                     onClick={() => {
                      setIsModalOpen(true); 
                      handleAction("delete"); 
                    }}
                    className="flex items-center px-4 py-2 hover:bg-gray-100  cursor-pointer rounded-md dark:hover:bg-neutral-600 dark:hover:text-white"
                  >
                   <Trash  size={15} className="mr-3"/> Delete
                  </p>
                </li>
              </ul>
            </div>
            {isModalOpen && (
              <ConfirmationModal
                onClose={handleClose}
                onConfirm={handleConfirm}
                size="md:w-96"
              />
            )}
          </div>
        )}

      <div
        onMouseEnter={handleMouseEnterMessage}
        onMouseLeave={handleMouseLeaveMessage}
        className="bg--500 flex justify-center"
      >
        <div
          className={`px-1 py-1 max-w-xs relative  flex flex-row ${
            isSender ? "order-1" : "order-2"
          } ${
            isSender
              ? "bg-[#1da1f2] text-white rounded-l-lg rounded-tr-lg"
              : "bg-gray-300 dark:bg-neutral-800 dark:text-white text-gray-800 rounded-br-lg rounded-tr-lg rounded-tl-lg"
          }`}
        >
         
          {message.attachments.length > 0 ? (
            <div className="flex flex-col relative">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="mb-">
                  {getMediaElement(attachment.type, attachment.url)}
                </div>
              ))}
              {message.content && (
                <div className="text-sm mt-2 rounded-full">
                  {message.content}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-row">
              <div className={`text-sm px-3 rounded-full mr-9`}>
              <p className={` text-[12px] ${isSender ? "justify-end text-blue-900" : "justify-start dark:text-neutral-400 text-neutral-500"} flex w-max"`}> {sender}</p>
                {message.content}
              </div>
            </div>
          )}
          <p
            className={`bg--600 flex text-[10px] justify-end absolute bottom-[1px] mt-1 right-[4px]  ${
              isSender ? "text-neutral-300" : "dark:text-neutral-400"
            }`}
          >
            {formatTime(message.createdAt)}
          </p>
        </div>
        <div
          className={`h-8 w-8 mt-1 bg--300 rounded-full overflow-hidden ${
            isSender ? "order-2 ml-1" : "order-1 mr-1"
          }`}
        >
          <img
            src={message.sender.profileImage}
            alt="Profile Preview"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      </div>
    </div>
  );
};
