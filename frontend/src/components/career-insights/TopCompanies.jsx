import {
FaBuilding,
FaStar,
} from "react-icons/fa";

const companies=[
"Google",
"Microsoft",
"Amazon",
"Adobe",
"NVIDIA",
"Salesforce",
"TCS",
"Infosys",
"Accenture",
];

function TopCompanies(){

return(

<div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

<div className="flex items-center gap-3 mb-8">

<div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">

<FaBuilding className="text-blue-600 text-2xl"/>

</div>

<div>

<h2 className="text-2xl font-black">
Top Hiring Companies
</h2>

<p className="text-slate-500">
Companies matching your profile
</p>

</div>

</div>

<div className="grid md:grid-cols-3 gap-5">

{companies.map((company,index)=>(

<div
key={index}
className="rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition p-6">

<div className="flex justify-between items-center mb-4">

<h3 className="font-black">
{company}
</h3>

<FaStar className="text-yellow-400"/>

</div>

<p className="text-slate-500 text-sm">
High hiring potential for your skill profile.
</p>

<button className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold">
View Jobs
</button>

</div>

))}

</div>

</div>

);

}

export default TopCompanies;