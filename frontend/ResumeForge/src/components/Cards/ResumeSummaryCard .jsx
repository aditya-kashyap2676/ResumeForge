import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../Utils/helper";

const ResumeSummaryCard = ({
  imgUrl,
  title,
  lastUpdated,
  onSelect,
}) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("#ffffff");
        });
    } else {
      setBgColor("#ffffff");
    }
  }, [imgUrl]);

  return (
    <div
      className="h-75 flex flex-col bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md overflow-hidden cursor-pointer transition-all duration-200"
      onClick={onSelect}
    >
      <div
        className="w-full flex-1 min-h-0 p-4 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title || "Resume"}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-sm text-gray-400">
            No preview available
          </div>
        )}
      </div>

      <div className="w-full shrink-0 bg-white border-t border-gray-100 px-4 py-3">
        <h5 className="text-sm font-medium text-gray-800 truncate">
          {title}
        </h5>

        <p className="text-xs font-medium text-gray-500 mt-0.5 truncate">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;