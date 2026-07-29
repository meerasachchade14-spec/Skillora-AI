import { FaComments } from "react-icons/fa";

const skills = [
  ["Technical",90],
  ["Communication",82],
  ["Problem Solving",88],
  ["Confidence",79],
];

function InterviewReadiness(){

return(

<div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

<h2 className="text-2xl font-black mb-8 flex items-center gap-3">

<FaComments className="text-blue-600"/>

Interview Readiness

</h2>

<div className="space-y-6">

{skills.map(([title,value])=>(

<div key={title}>

<div className="flex justify-between mb-2">

<span className="font-semibold">{title}</span>

<span className="font-bold text-blue-600">{value}%</span>

</div>

<div className="h-3 rounded-full bg-slate-100">

<div
className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
style={{width:`${value}%`}}
/>

</div>

</div>

))}

</div>

</div>

);

}

export default InterviewReadiness;