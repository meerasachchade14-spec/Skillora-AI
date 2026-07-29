import {
FaBuilding,
FaUsers,
FaGlobe,
FaStar
} from "react-icons/fa";

function CompanyCard(){

return(

<div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

<div className="flex justify-between items-center mb-8">

<div>

<h2 className="text-2xl font-black">

Top Company Match

</h2>

<p className="text-slate-500 mt-1">

Best company based on your profile

</p>

</div>

<div className="w-16 h-16 rounded-3xl bg-red-500 text-white flex items-center justify-center text-3xl font-black">

G

</div>

</div>

<div className="space-y-5">

<div className="flex justify-between">

<span className="text-slate-500">

Company

</span>

<b>Google</b>

</div>

<div className="flex justify-between">

<span className="text-slate-500">

Rating

</span>

<span className="flex items-center gap-2 font-bold">

<FaStar className="text-yellow-500"/>

4.8

</span>

</div>

<div className="flex justify-between">

<span className="text-slate-500">

Employees

</span>

<span className="font-bold">

180,000+

</span>

</div>

<div className="flex justify-between">

<span className="text-slate-500">

Website

</span>

<span className="text-blue-600 font-bold">

careers.google.com

</span>

</div>

</div>

<div className="mt-8 rounded-3xl bg-blue-50 border border-blue-100 p-6">

<p className="leading-7 text-slate-600">

Google is actively hiring frontend engineers with React,
TypeScript and AI experience.

</p>

</div>

</div>

);

}

export default CompanyCard;