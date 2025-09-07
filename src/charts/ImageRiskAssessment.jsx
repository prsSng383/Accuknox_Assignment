import React from "react";

export default function ImageRiskAssessment() {
  return (
    <div className="px-4 py-3">
      <h3 className="font-semibold mb-1">Image Risk Assessment</h3>
      <div className="text-2xl font-bold">
        1470 <span className="font-normal text-base text-gray-700">Total Vulnerabilities</span>
      </div>
      <div className="w-full h-5 rounded-lg overflow-hidden my-3 flex bg-gray-200">
        <div className="bg-[#941a1d] h-5" style={{ width: "10%" }}></div>
        <div className="bg-[#f09e1c] h-5" style={{ width: "60%" }}></div>
        <div className="bg-[#ece977] h-5" style={{ width: "27%" }}></div>
        <div className="bg-[#888] h-5" style={{ width: "3%" }}></div>
      </div>
      <div className="flex gap-5 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#941a1d] rounded inline-block"></span>
          Critical (9)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#f09e1c] rounded inline-block"></span>
          High (150)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#ece977] rounded inline-block"></span>
          Medium (1100)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#888] rounded inline-block"></span>
          Low (211)
        </div>
      </div>
    </div>
  );
}
