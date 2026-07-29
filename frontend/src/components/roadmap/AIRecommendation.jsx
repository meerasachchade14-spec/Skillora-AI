import { FaRobot, FaArrowRight } from "react-icons/fa";

function AIRecommendation() {

    return (

        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-3xl font-black text-slate-900">
                        AI Learning Recommendation
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Generated according to your profile.
                    </p>

                </div>

                <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">
                    AI Powered
                </div>

            </div>

            <div className="rounded-3xl bg-gradient-to-r from-sky-500 to-blue-700 text-white p-8">

                <div className="flex items-center gap-4 mb-5">

                    <FaRobot className="text-5xl"/>

                    <div>

                        <h3 className="text-2xl font-black">
                            Skillora AI Mentor
                        </h3>

                        <p className="text-sky-100">
                            Personalized Study Plan
                        </p>

                    </div>

                </div>

                <p className="leading-8 text-sky-100">

                    Your strongest area is Frontend Development.
                    To maximize placement opportunities,
                    focus on Backend Development, Docker,
                    Cloud Computing and DSA.

                </p>

                <button className="mt-8 flex items-center gap-3 bg-white text-blue-700 font-bold px-6 py-3 rounded-2xl">

                    Start Learning

                    <FaArrowRight/>

                </button>

            </div>

        </div>

    );

}

export default AIRecommendation;