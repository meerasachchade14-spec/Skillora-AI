import {
  FaCode,
  FaArrowUp,
} from "react-icons/fa";

const skills=[
{
name:"React",
impact:"95%",
},
{
name:"TypeScript",
impact:"91%",
},
{
name:"Node.js",
impact:"88%",
},
{
name:"Docker",
impact:"82%",
},
{
name:"AWS",
impact:"96%",
},
];

function SkillsImpact(){

return(

<div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

<div className="flex items-center gap-3 mb-8">

<div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
<FaCode className="text-blue-600 text-2xl"/>
</div>

<div>

<h2 className="text-2xl font-black">
Skills Impact
</h2>

<p className="text-slate-500">
How each skill affects recruiter interest
</p>

</div>

</div>

<div className="space-y-5">

{skills.map((skill,index)=>(

<div
key={index}
className="rounded-3xl border p-6">

<div className="flex justify-between">

<h3 className="font-bold">
{skill.name}
</h3>

<span className="font-black text-blue-600">
{skill.impact}
</span>

</div>

<div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-4">

<div
className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
style={{
width:skill.impact,
}}
/>

</div>

</div>

))}

</div>

<div className="mt-8 bg-gradient-to-r from-sky-500 to-blue-700 rounded-3xl p-7 text-white">

<div className="flex gap-3 mb-3">

<FaArrowUp/>

<h3 className="font-black text-xl">
Career Advice
</h3>

</div>

<p className="text-blue-100 leading-8">
Adding Docker, AWS and TypeScript can significantly improve your recruiter match score.
</p>

</div>

</div>

);

}

export default SkillsImpact;