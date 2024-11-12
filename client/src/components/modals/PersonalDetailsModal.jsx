/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PersonalDetailsModal = ({ isOpen, onClose, onDetailsSubmitted }) => {
  const modalRef = useRef(null);

  const validationSchema = Yup.object().shape({
    age: Yup.number()
      .required("Age is required")
      .min(11, "Age must be above 10 years"),
    weight: Yup.number()
      .required("Weight is required")
      .min(11, "Weight must be more than 10 kg"),
    height: Yup.number()
      .required("Height is required")
      .min(1, "Height must be specified in cm"),
    fitnessLevel: Yup.string().required("Fitness level is required"),
    transformationType: Yup.string().required("Transformation type is required"),
  });

  const handleSubmit = (values) => {
    onDetailsSubmitted(values);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} justify-center items-center bg-black dark:bg-opacity-90 bg-opacity-30`}>
      <div ref={modalRef} className="shadow-[0px_14px_42px_10px_#00000024] bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-8 items-center">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Enter Personal Details</h2>
         
        </div>

        <Formik
          initialValues={{
            age: "",
            weight: "",
            height: "",
            fitnessLevel: "",
            transformationType: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <Field
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200"
                />
                <ErrorMessage name="age" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mb-4">
                <Field
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200"
                />
                <ErrorMessage name="weight" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mb-4">
                <Field
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200"
                />
                <ErrorMessage name="height" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mb-4">
                <Field as="select" name="fitnessLevel" className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200">
                  <option value="">Select Fitness Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Field>
 <ErrorMessage name="fitnessLevel" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mb-4">
                <Field as="select" name="transformationType" className="border bg-slate-100 border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md p-2 w-full focus:outline-none focus:border-blue-200">
                  <option value="">Select Transformation Type</option>
                  <option value="weight_loss">Weight Loss</option>
                  <option value="weight_gain">Weight Gain</option>
                  <option value="fit_healthy">Fit and Healthy</option>
                </Field>
                <ErrorMessage name="transformationType" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-thirve-blue dark:bg-rex-green bg-rex-green-light text-black font-semibold px-4 py-1 rounded-lg hover:bg-blue-400 transition duration-200"
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

export default PersonalDetailsModal;