import { Outlet } from "react-router-dom";
import SideNavbarTrainer from "../../components/navbars/SideNavbarTrainer";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbars/Navbar";
import { CLIENT_API } from "../../redux/actions/authActions";
import { RotateCw } from "lucide-react";

const TrainerLayout = () => {
  const [isVerifiedByAdmin, setIsVerifiedByAdmin] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await CLIENT_API.get(
          "/member/check-admin-verification"
        );
        setIsVerifiedByAdmin(response.data.isVerifiedByAdmin);
      } catch (error) {
        console.error("Error fetching verification status", error);
      }
    };

    fetchVerificationStatus();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <div className="w-full h-screen bg-red-00">
        <Navbar categoryName="Trainer Dashboard" />

        {isVerifiedByAdmin ? (
          <div className="h-full w-full flex-row  flex ">
            <div className="w-[70px]  md:w-[20%] h-full ">
              <SideNavbarTrainer />
            </div>
            <div className="h-full w-full md:w-[80%]  pt-16">
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-center">
              Your Joining Request has been sent to the Admin. Please wait until its verified.!
              <span
                onClick={handleRefresh}
                className="flex items-center gap-2 justify-center text-blue-500 mt-2 cursor-pointer"
              >
                Refresh page <RotateCw size={18} />
              </span>
            </h1>
          </div>
        )}

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm text-center">
              <p>Your request is still pending. Please try again later.</p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 px-4 py-1 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TrainerLayout;
