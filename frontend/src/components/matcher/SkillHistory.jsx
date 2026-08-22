import { useState, useEffect } from "react";
import matcherService from "../../services/matcherService";
import {
  FaHistory,
  FaArrowUp,
} from "react-icons/fa";

const mockHistory = [
  {
    month: "April",
    score: 72,
  },
  {
    month: "May",
    score: 78,
  },
  {
    month: "June",
    score: 82,
  },
  {
    month: "July",
    score: 88,
  },
];

function SkillHistory({ onSelectMatch }) {
  const [history, setHistory] = useState(mockHistory);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await matcherService.getMatchHistory();
        if (data && data.length > 0) {
          const formatted = data.map((item) => {
            let displayLabel = item.jobTitle;
            try {
              if (item.createdAt) {
                const cleanDate = item.createdAt.includes("T") ? item.createdAt : item.createdAt.replace(" ", "T");
                const dateObj = new Date(cleanDate);
                const monthName = dateObj.toLocaleString("en-US", { month: "long" });
                displayLabel = `${item.jobTitle} (${monthName})`;
              }
            } catch (e) {
              console.log(e);
            }
            return {
              id: item.id,
              month: displayLabel,
              score: item.matchScore,
              // Keep original structure so we can set it back as active matchResult
              matchedSkills: item.matchedSkills,
              missingSkills: item.missingSkills,
              recommendations: item.recommendations,
              jobTitle: item.jobTitle,
              matchScore: item.matchScore
            };
          });
          setHistory(formatted);
        }
      } catch (err) {
        console.log("Using mock match history:", err.message);
      }
    };
    fetchHistory();
  }, []);


  return (

    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
          <FaHistory className="text-green-600 text-2xl"/>
        </div>

        <div>

          <h2 className="text-2xl font-black">
            Progress History
          </h2>

          <p className="text-slate-500 mt-1">
            Track your AI skill match improvement.
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {history.map((item,index)=>(

          <div
            key={index}
            onClick={() => onSelectMatch && onSelectMatch(item)}
            className="flex justify-between items-center rounded-2xl bg-slate-50 p-5 cursor-pointer hover:bg-slate-100 transition-all duration-200"
          >


            <span className="font-semibold">
              {item.month}
            </span>

            <div className="flex items-center gap-3">

              <span className="font-black text-blue-600 text-xl">
                {item.score}%
              </span>

              <FaArrowUp className="text-green-500"/>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default SkillHistory;