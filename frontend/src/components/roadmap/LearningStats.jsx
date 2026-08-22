import {
FaBookOpen,
FaCheckCircle,
FaClock,
FaCode
} from "react-icons/fa";

function LearningStats({ roadmap }) {
  const total = roadmap && roadmap.steps ? roadmap.steps.length : 8;
  const completed = roadmap && roadmap.steps ? roadmap.steps.filter(s => s.status === 'completed').length : 3;
  const remaining = total - completed;

  const stats = [
    {
      title: "Topics Completed",
      value: String(completed),
      icon: <FaCheckCircle/>,
      color: "green"
    },
    {
      title: "Topics Remaining",
      value: String(remaining),
      icon: <FaBookOpen/>,
      color: "blue"
    },
    {
      title: "Hours Learned",
      value: String(completed * 12 + 24),
      icon: <FaClock/>,
      color: "orange"
    },
    {
      title: "Projects Built",
      value: String(Math.max(1, Math.round(completed * 0.8))),
      icon: <FaCode/>,
      color: "purple"
    }
  ];


return(

<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

{stats.map((item,index)=>(

<div
key={index}
className="bg-white rounded-[28px] shadow-sm border border-slate-200 p-7 hover:shadow-lg transition"
>

<div className={`w-14 h-14 rounded-2xl mb-5 flex items-center justify-center text-2xl
${
item.color==="green"
?"bg-green-100 text-green-600"
:item.color==="blue"
?"bg-sky-100 text-sky-600"
:item.color==="orange"
?"bg-orange-100 text-orange-600"
:"bg-purple-100 text-purple-600"
}
`}>

{item.icon}

</div>

<p className="text-slate-500">

{item.title}

</p>

<h2 className="text-4xl font-black mt-3 text-slate-900">

{item.value}

</h2>

</div>

))}

</div>

);

}

export default LearningStats;