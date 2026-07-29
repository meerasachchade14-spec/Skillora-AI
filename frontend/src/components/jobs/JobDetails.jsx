import {
FaCheckCircle
} from "react-icons/fa";

function JobDetails(){

const responsibilities=[

"Build scalable React applications",

"Collaborate with backend developers",

"Write reusable UI components",

"Optimize application performance",

"Participate in code reviews"

];

const requirements=[

"ReactJS",

"JavaScript",

"TypeScript",

"Git",

"REST APIs"

];

return(

<div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

<h2 className="text-2xl font-black mb-8">

Job Details

</h2>

<div className="grid md:grid-cols-2 gap-8">

<div>

<h3 className="font-black text-lg mb-5">

Responsibilities

</h3>

<div className="space-y-4">

{

responsibilities.map((item,index)=>(

<div

key={index}

className="flex gap-3"

>

<FaCheckCircle className="text-green-500 mt-1"/>

<p className="text-slate-600">

{item}

</p>

</div>

))

}

</div>

</div>

<div>

<h3 className="font-black text-lg mb-5">

Required Skills

</h3>

<div className="flex flex-wrap gap-3">

{

requirements.map((item,index)=>(

<span

key={index}

className="px-5 py-3 rounded-full bg-blue-50 text-blue-600 font-semibold"

>

{item}

</span>

))

}

</div>

</div>

</div>

<div className="mt-8 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white">

<h3 className="text-xl font-black mb-3">

Hiring Note

</h3>

<p className="text-sky-100 leading-8">

Candidates with strong React projects,
GitHub activity and modern frontend
development experience will receive higher
priority during screening.

</p>

</div>

</div>

);

}

export default JobDetails;