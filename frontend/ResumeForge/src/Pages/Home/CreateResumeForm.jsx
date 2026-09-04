import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a resume title.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.RESUME.CREATE,
        {
          title: title.trim(),
        }
      );

      console.log("Create resume response:", response.data);

      // Backend response direct resume ya { resume: {...} } ho sakta hai
      const resumeId =
        response.data?._id || response.data?.resume?._id;

      if (!resumeId) {
        setError("Resume ID was not received from the server.");
        return;
      }

      navigate(`/resume/${resumeId}`);
    } catch (error) {
      console.error("Create resume error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[90vw] max-w-[500px] flex-col justify-center p-7">
      <h3 className="text-lg font-semibold text-black">
        Create New Resume
      </h3>

      <p className="text-sm text-gray-600">
        Give your resume a title to get started. You can edit all details later.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="Resume Title"
          placeholder="Eg: Alex Resume"
          type="text"
        />

        {error && (
          <p className="pb-2.5 text-xs text-red-500">
            {error}
          </p>
        )}

        <button
          className="mt-5 w-full rounded-lg bg-black py-3 text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Resume"}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;