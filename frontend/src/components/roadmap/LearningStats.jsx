import {
FaBookOpen,
FaCheckCircle,
FaClock,
FaCode
} from "react-icons/fa";

const stats = [

{
title:"Topics Completed",
value:"32",
icon:<FaCheckCircle/>,
color:"green"
},

{
title:"Topics Remaining",
value:"14",
icon:<FaBookOpen/>,
color:"blue"
},

{
title:"Hours Learned",
value:"156",
icon:<FaClock/>,
color:"orange"
},

{
title:"Projects Built",
value:"9",
icon:<FaCode/>,
color:"purple"
}

];

function LearningStats(){

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