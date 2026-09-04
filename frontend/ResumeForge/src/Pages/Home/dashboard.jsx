import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuCirclePlus } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
// import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import moment from 'moment'
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard ";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modals/Modal";
const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResume, setAllResume] = useState([]);

  const fetchAllResume = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_ALL
      );

      setAllResume(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResume();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        <div
          className="h-75 flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
            <LuCirclePlus className="text-xl text-purple-500" />
          </div>

          <h3 className="font-medium text-gray-800">
            Add New Resume
          </h3>
        </div>

        {allResume.map((resume) => (
          <ResumeSummaryCard
            key={resume._id}
            imgUrl={resume.thumbnailLink || null}
            title={resume.title}
            lastUpdated={
              resume.updatedAt
                ? new Date(resume.updatedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : ""
            }
            onSelect={() => navigate(`/resume/${resume._id}`)}
          />
        ))}
      </div>
      <Modal isopen={openCreateModal}
        onclose={() => {
          setOpenCreateModal(false)
        }} hideheader>
        <div><CreateResumeForm /></div>
      </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;