/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef } from "react";
import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DailyDataModal = ({ isOpen, onClose, onDailyDataSubmitted }) => {
  const modalRef = useRef(null);

  const validationSchema = Yup.object().shape({
    currentWeight: Yup.number().positive("Valid weight is required").required("Current weight is required"),
    workoutTime: Yup.string().required("Workout time is required"),
    bodyPart: Yup.string().required("Body part is required"),
  });

  const workoutTimeOptions = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
  ];

  const handleSubmit = (values) => {
    onDailyDataSubmitted({ ...values, attendance: true });
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} justify-center items-center bg-black dark:bg-opacity-80 bg-opacity-30`}>
      <div ref={modalRef} className="shadow-[0px_14px_42px_10px_#00000024] bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-8 items-center">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Attendance Entry</h2>
          <div onClick={onClose} className="flex items-center justify-center bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-700 hover:text-white rounded-full w-7 h-7 mb-3">
            <X size={19} />
          </div>
        </div>

        <Formik
          initialValues={{
            attendance: true,
            currentWeight: "",
            workoutTime: "",
            bodyPart: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="number"
                  name="currentWeight"
                  placeholder="Current Weight (kg)"
                  className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200"
                />
                <ErrorMessage name="currentWeight" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mb-4">
                <Field
                  as="select"
                  name="workoutTime"
                  className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200"
                >
                  <option value="">Select Workout Time</option>
                  {workoutTimeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="workoutTime" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mb-4">
                <Field
                  as="select"
                  name="bodyPart"
                  className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200"
                >
                  <option value="">Select Body Part</option>
                  <option value="chest">Chest</option>
                  <option value="back">Back</option>
                  <option value="arms">Arms</option>
                  <option value="legs">Legs</option>
                  <option value="shoulders">Shoulders</option>
                  <option value="core">Core</option>
                </Field>
                <ErrorMessage name="bodyPart" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  type="button"
                  className="dark:text-neutral-300 text-neutral-500 mr-2 px-4 py-1 rounded-lg dark:hover:bg-neutral-800 hover:bg-neutral-200 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-thirve-blue text-black font-semibold px-4 py-1 rounded-lg hover:bg-rex-green-light bg-rex-green transition duration-200"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DailyDataModal;
