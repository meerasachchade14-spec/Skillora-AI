import { FaRobot } from "react-icons/fa";

function AICareerAdvisor(){

return(

<div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

<div className="rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white p-8">

<div className="flex items-center gap-4 mb-6">

<FaRobot className="text-5xl"/>

<div>

<h2 className="text-3xl font-black">

AI Career Advisor

</h2>

<p className="text-sky-100">

Personalized career guidance

</p>

</div>

</div>

<p className="leading-8 text-sky-100">

Based on your resume, current skills, learning progress and market demand,
you are highly suitable for Frontend Development and Full Stack Development.

Learning Docker, AWS, System Design and TypeScript will significantly improve
your placement chances and increase your expected salary package.

Continue building real-world projects, contribute regularly on GitHub,
participate in hackathons and strengthen DSA for top product companies.

</p>

</div>

</div>

);

}

export default AICareerAdvisor;