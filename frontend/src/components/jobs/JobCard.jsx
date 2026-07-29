import {
FaMapMarkerAlt,
FaMoneyBillWave,
FaArrowRight
} from "react-icons/fa";

function JobCard({job}){

return(

<div className="rounded-3xl border border-slate-200 hover:border-sky-400 hover:shadow-xl transition duration-300 p-6">

<div className="flex justify-between">

<div className="flex gap-4">

<div className={`w-14 h-14 rounded-2xl ${job.color} text-white flex items-center justify-center text-xl font-black`}>

{job.logo}

</div>

<div>

<h3 className="font-black text-lg">

{job.role}

</h3>

<p className="text-slate-500">

{job.company}

</p>

</div>

</div>

<div className="bg-green-50 text-green-600 px-3 py-2 rounded-xl font-bold">

{job.match}%

</div>

</div>

<div className="mt-6 space-y-3">

<div className="flex items-center gap-3 text-slate-600">

<FaMapMarkerAlt/>

{job.location}

</div>

<div className="flex items-center gap-3 text-slate-600">

<FaMoneyBillWave/>

{job.salary}

</div>

</div>

<div className="flex gap-3 mt-7">

<button className="flex-1 border rounded-xl py-3 font-semibold hover:bg-slate-50">

Details

</button>

<button className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 font-semibold flex justify-center items-center gap-2 hover:scale-105 transition">

Apply

<FaArrowRight/>

</button>

</div>

</div>

);

}

export default JobCard;