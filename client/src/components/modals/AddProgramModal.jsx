/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { CLIENT_API } from "../../utils/axios/axiosInterceptor.js";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import cloudinaryimageUpload from "../../utils/cloudinary/cloudinaryService.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddProgramModal = ({ isOpen, onClose, onProgramAdded }) => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { data } = useSelector((state) => state.user);
  const currentUser  = data;

  const modalRef = useRef(null);

  // Reset form data when modal is closed or submitted
  const resetForm = () => {
    setMembers([]);
    setSearchTerm("");
    setSearchResults([]);
    setImage(null);
  };

  const handleImageUpload = async (e, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const cloudinaryUrl = await cloudinaryimageUpload(file);
        setImage(cloudinaryUrl);
        setFieldValue('image', cloudinaryUrl); // Set image in Formik state
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
      }
    }
  };

  const handleSearchUsers = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    try {
      const response = await CLIENT_API.get(
        `/member/search-users?query=${encodeURIComponent(searchTerm)}`
      );
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleAddMember = (user) => {
    if (!members.some((member) => member._id === user._id)) {
      setMembers((prev) => [...prev, user]);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const handleRemoveMember = (userId) => {
    setMembers((prev) => prev.filter((member) => member._id !== userId));
  };

  const handleCreateProgram = async (values) => {
    const programData = {
      title: values.title,
      description: values.description,
      image: values.image,
      price: values.price,
      members: members.map((member) => member._id),
      creator: currentUser ?._id,
    };

    try {
      setIsLoading(true);  // Set loading to true when submitting
      const response = await CLIENT_API.post("/trainer/add-program", programData);
      
      if (response.data.success) {
        onProgramAdded();
        onClose();
        resetForm();  // Clear form after submission
      }
    } catch (error) {
      console.error("Error creating program:", error);
    } finally {
      setIsLoading(false);  // Set loading to false after submission
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    title: Yup.string().required("Program title is required"),
    description: Yup.string().required("Program description is required"),
    image: Yup.string().required("Program image is required"),
    price: Yup.number ().required("Price is required").positive("Price must be a positive number").integer("Price must be an integer"),
  });

  return (
    <Formik
      initialValues={{ title: "", description: "", image: "", price: "" }}
      validationSchema={validationSchema}
      onSubmit={handleCreateProgram}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Add Program</h2>

              {/* Title */}
              <Field
                type="text"
                name="title"
                placeholder="Program Title"
                className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-200"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 mb-2" />

              {/* Description */}
              <Field
                as="textarea"
                name="description"
                placeholder="Program Description"
                className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-200"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 mb-2" />

              {/* Image Upload */}
              <div className="mb-4 dark:bg-neutral-800 bg-slate-100 border p-2 flex justify-center items-center border-dashed border-neutral-500 dark:border-neutral-700 rounded-lg">
                <label htmlFor="image-upload" className="block text-sm font-medium w-full dark:text-neutral-500 text-neutral-500 cursor-pointer">
                  {image ? (
                    <img src={image} alt="Program Preview" className="w-full h-32 object-cover rounded-lg mt-2 " />
                  ) : (
                    "Click here to upload image"
                  )}
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                  className="hidden"
                />
                <ErrorMessage name="image" component="div" className="text-red-500 mb-2" />
              </div>

              {/* Price */}
              <Field
                type="number"
                name="price"
                placeholder="Price"
                className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-200"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 mb-2" />

              {/* Members Search */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for members"
                className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-200"
              />
              {isLoading && <p>Loading...</p>}
              {searchResults.length > 0 && (
                <ul className="border border-gray-300 dark:border-neutral-500 rounded-md max-h-40 overflow-auto">
                  {searchResults.map((user) => (
                    <li
                      key={user._id}
                      onClick={() => handleAddMember(user)}
                      className="p-2 dark:hover:bg-neutral-700 dark:bg-neutral-800 hover:bg-neutral-200 cursor-pointer"
                    >
                      {user.Username}
                    </li>
                  ))}
                </ul>
              )}

              {/* Selected Members */}
              <div className="selected-members mt-2 flex flex-wrap">
                {members.map((member) => (
                  <span
                    key={member._id}
                    className="p-1 bg-gray-200 dark:bg-neutral-500 rounded mr-2 inline-flex items-center"
                  >
                    {member.Username}
                    <button
                      className="ml-2 text-black dark:text-white flex justify-center items-center"
                      onClick={() => handleRemoveMember(member._id)}
                    >
                      <IoCloseCircleOutline />
                    </button>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className ="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => { onClose(); resetForm(); }}
                  className="bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white mr-2 px-4 py-1 rounded-lg dark:hover:bg-neutral-700 hover:bg-neutral-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rex-green text-black px-4 py-1 rounded-lg hover:bg-rex-green-light transition duration-200 flex items-center"
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm text-white mr-2" />
                  ) : null}
                  Create Program
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProgramModal;