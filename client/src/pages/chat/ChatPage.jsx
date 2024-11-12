import React, { useState, useEffect, useRef } from "react";
import ContactSearchBar from "@/components/searchBars/ContactSearchbar";
import UserContact from "@/components/chat/UserContact";
import { useSelector } from "react-redux";
import { IoMdMore } from "react-icons/io";
import { GrAttachment, GrMicrophone } from "react-icons/gr";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { TbSend2 } from "react-icons/tb";
import { FaRegFaceSmile } from "react-icons/fa6";
import { MdPhotoCamera, MdVideoCall, MdAttachFile } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CLIENT_API } from "@/axios";
import { FiEdit } from "react-icons/fi";
import AddNewChatModal from "@/components/chat/AddnewChatModal";
import { HiTrash } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import { config } from "@/common/configuratoins";
import { Chat, IMessage } from "@/types/IChat";
import { ChatMessageBubble } from "./ChatMessagBubble";
import { useSocket } from "@/contexts/SocketContext";
import { ClipLoader } from "react-spinners";
import { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
import { sendInAppNotification } from "@/utils/notification/notificationService";

const ChatPage = () => {
  const { chatType } = useParams<{ chatType }>();
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const pickerRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
 
  const { socket } = useSocket();
  const bottomRef = useRef(null);


  const { data } = useSelector((state) => state.user);
  const currentUser  = data;
  const currentUserId = currentUser ?._id;





  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
        setRefresh((prev) => !prev);
        const Chatparticipants = message.participants;
        Chatparticipants.forEach((participantId) => {
          const notification = {
            userId: participantId,
            message: `New message from ${message.sender.firstname} ${message.sender.lastname}`,
          };

          sendInAppNotification(notification);
        });
      };
      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        socket.disconnect();
      };
    }
  }, [socket, currentUserId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!typing) {
      setTyping(true);

      if (socket && selectedChatId) {
        socket.emit("typing", {
          roomId: selectedChatId,
          sender: currentUserId,
        });
      }
    }
  };


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() || messageFiles.length > 0 || audioBlob) {
      setInputValue("");
      setMessageFiles([]);
      setAudioBlob(null);
      setShowRecordingPopup(false);
      const currentUserId = currentUser ?._id;
      const chatId = selectedChatId;

      const attachments = messageFiles.map((file) => ({
        url: file.url,
        type: file.type,
      }));

      const chatPayload = {
        content: inputValue || "",
        sender: currentUserId,
        attachments: attachments,
        chat: chatId,
      };

      try {
        const response = await CLIENT_API.post(
          "/media/send-message",
          chatPayload,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          const sender = {
            _id: currentUser ?._id || "",
            firstname: currentUser ?.firstname || "",
 lastname: currentUser  ?.lastname || "",
            profileImage: currentUser  ?.profileImage || "",
          };

          const ChatsocketPayload = {
            _id: response.data.chatMessage._id,
            attachments: attachments,
            chat: chatId,
            content: inputValue || "",
            createdAt: new Date(),
            sender: sender,
            participants: chatParticipants,
          };

          if (socket) {
            socket.emit("newMessage", { obj: ChatsocketPayload });
          } else {
            console.error("Socket not connected yet, cannot emit message.");
          }

          setInputValue("");
          setMessageFiles([]);
          setAudioBlob(null);
          setShowPicker(false);
          setUploadedFileUrls([]);
          setRefresh((prev) => !prev);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onEmojiClick = (emojiData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const handleClickOutside = (event) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target ) &&
      anchorEl &&
      !anchorEl.contains(event.target)
    ) {
      handleCloseMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  

  const handleChatOpen = (chatId , chat ) => {
    setIsChatOpen(true);
    setSelectedChatId(chatId);

    if (socket && chatId) {
      socket.emit("joinRoom", chatId);
    }

    const participants = chat.participants
      .filter((participant) => participant._id !== currentUserId)
      .map((participant) => participant._id);
    setChatParticipants(participants);
    setRefresh((prev) => !prev);

    const chatName = chat.isGroupChat
      ? chat.name
      : chat.participants
          .filter((participant) => participant._id !== currentUserId)
          .map(
            (participant) => `${participant.firstname} ${participant.lastname}`
          )
          .join(", ");

    setSelectedChatName(chatName);
    const profileImage = chat.isGroupChat
      ? chat.groupIcon
      : chat.participants.filter(
          (participant) => participant._id !== currentUserId
        )[0]?.profileImage;

    setSelectedChatProfileImage(profileImage);
  };

 

  const renderChatHeader = () => {
    return (
      <div className="h-[9%] bg--400 flex border-b border-neutral-300 dark:border-neutral-700">
        <div className="w-[70px] bg--500 h-full flex justify-center items-center ">
          <img
            src={selectedChatProfileImage || undefined}
            className="rounded-md object-cover h-11 w-11"
            alt=""
          />
        </div>
        <div className="w-[100%] bg--300 h-full flex p-2">
          <div className="w-[100%] bg--500 flex flex-col">
            <h1 className="text-base font-semibold text-gray-700 dark:text-white mt-2">
              {selectedChatName || "Full Name"}
            </h1>
            <h4 className="text-sm text-gray-600 dark:text-neutral-400">
              All chats are encrypted
            </h4>
          </div>
          <div className="w-20px bg--400 flex justify-center items-center">
            <IoMdMore
              size={25}
              className="text-gray-500 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderContacts = () => {
    const contacts = chatData;

    contacts.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const contactsAvailable = contacts.length > 0;

    if (chatType === "all-inbox" || chatType === "groups") {
      if (contactsAvailable) {
        return (
          <>
            {contacts.map((chat) => {
              const otherParticipant = chat.participants.find(
                (participant) => participant._id !== currentUserId
              );

              return (
                <div
                  key={chat._id}
                  onClick={() => handleChatOpen(chat._id, chat)}
                >
                  <User Contact
                    profileImage={
                      chat.isGroupChat
                        ? chat.groupIcon
                        : otherParticipant?.profileImage ||
                          "https://res.cloudinary.com/djo6yu43t/image/upload/v1725124534/IMG_20240831_224439_v7rnsg.jpg"
                    }
                    fullName={
                      chat.isGroupChat
                        ? chat.name
                        : `${otherParticipant?.firstname ?? ""} ${
                            otherParticipant?.lastname ?? ""
                          }`
                    }
                    lastMessage={
                      chat.lastMessage
                        ? chat.lastMessage.content
                        : "No messages yet"
                    }
                  />
                </div>
              );
            })}
          </>
        );
      } else {
        return (
          <div className="flex justify-center items-center h-full">
            <p className="py-1 bg-slate-200 rounded-lg px-4 dark:bg-neutral-800 dark:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              No recent chat,{" "}
              <button className="text-blue-500" onClick={handleOpenModal}>
                create a new chat.
              </button>
            </p>
          </div>
        );
      }
    }
  };

  return (
    <div className="dark:bg-neutral-900 w-full flex h-[100%] relative">
      <div className="contacts-listing scrollbar-custom bg--300 w-[35%] pt-4 border-r border-neutral-300 dark:border-neutral-700 overflow-y-auto flex flex-col transition-transform duration-300">
        <div className="border-b border-neutral-300 dark:border-neutral-700">
        
        </div>
        {renderContacts()}
      </div>

      <div
        className={`fixed inset-0 z-50 ${
          isModalOpen ? "flex" : "hidden"
        } justify-center items-center bg-black bg-opacity-50`}
      >
        <div className="w-[30%] h-auto bg-white rounded-lg ">
        </div>
      </div>
      {isChatOpen ? (
        <div className="chat-listing w-[100%] lg:w-[65%] relative flex flex-col">
          {renderChatHeader()}

          <div className="chat-listing bg--400 h-[87%] w-full scrollbar-custom">
            <div className="flex bg-blue-50 dark:bg-neutral-950 flex-col-reverse space-y-3 pb-7 space-y-reverse p-4 overflow-y-auto h-full scrollbar-custom">
              <div ref={bottomRef} />
              {chatMessages &&
                chatMessages
                  .slice()
                  .reverse()
                  .map((message) => {
                    const isSender = message.sender._id === currentUserId;
                    return (
                      <ChatMessageBubble
                        key={message._id}
                        isSender={isSender}
                        message={message}
                        sender={
                          message.sender.firstname + " " + message.sender.lastname
                        }
                      />
                    );
                  })}
            </div>
          </div>
          <form
            onSubmit={handleSendMessage}
            className="chat-input bg-white dark:bg-dark-bg h-[7%] w-[100%] bottom-0 absolute flex border-t border-gray-300 dark:border-neutral-700"
          >
            <div className="bg--400 h-full w-[7%] flex justify-center items-center">
             
              
            </div>
            <div className="bg-400 h-full w-[82%] flex justify-center items-center p-2">
              <input
                value={inputValue}
                onChange={handleInputChange}
                className="w-full h-full bg--400 dark:bg-dark-bg rounded-md dark:text-white focus:outline-none"
              />
            </div>
            <div className="bg--400 h-full w-[13%] flex items-center justify-around">
              <div
                className="w-9 h-9 dark:hover:bg-neutral-700 dark:text-white hover:bg-slate-100 hover:cursor-pointer rounded-md flex justify-center items-center"
                onClick={() => setShowPicker((prev) => !prev)}
              >
                <FaRegFaceSmile size={19} />
              </div>
              {showPicker && (
                <div
                  className="absolute bottom-[7%] mb-10 right-40 z-50 w-[30%]"
                  ref={pickerRef}
                >
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
              <div className="flex items-center">
              <button
                        type="submit"
                        disabled={fileUploadLoading}
                        className="w-9 h-9 dark:text-white hover:bg-slate-100 dark:hover:bg-neutral-700 hover:cursor-pointer rounded-md"
                      >
                        <TbSend2 size={23} />
                      </button>
                
                  </div>
              
              </div>
         
          </form>
        </div>
      ) : (
        <div className="h-full w-[100%] lg:w-[65%] dark:bg-dark-bg dark:text-white flex justify-center items-center">
          <div className="no-contacts justify-center flex items-center w-full bg--400 h-full">
            <p className="py-1 bg-slate-200 rounded-lg px-4 dark:bg-neutral-800 dark:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              Select a chat to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;