import {
  FaArrowDown,
  FaLaptopCode,
  FaReact,
  FaServer,
  FaDatabase,
} from "react-icons/fa";

function SkillDependency() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

      <h2 className="text-3xl font-black mb-8">
        Skill Dependency
      </h2>

      <div className="grid md:grid-cols-4 gap-6 text-center">

        <div className="rounded-3xl bg-sky-50 p-8">

          <FaLaptopCode className="mx-auto text-5xl text-sky-600 mb-4" />

          <h3 className="font-bold">
            HTML • CSS
          </h3>

        </div>

        <div className="flex justify-center items-center">

          <FaArrowDown className="text-3xl text-slate-400 rotate-[-90deg] md:rotate-0"/>

        </div>

        <div className="rounded-3xl bg-blue-50 p-8">

          <FaReact className="mx-auto text-5xl text-blue-600 mb-4"/>

          <h3 className="font-bold">
            React.js
          </h3>

        </div>

        <div className="rounded-3xl bg-indigo-50 p-8">

          <FaServer className="mx-auto text-5xl text-indigo-600 mb-4"/>

          <h3 className="font-bold">
            Node / Django
          </h3>

        </div>

      </div>

      <div className="mt-8 rounded-3xl bg-slate-50 p-7">

        <div className="flex items-center gap-4">

          <FaDatabase className="text-4xl text-blue-600"/>

          <div>

            <h3 className="font-bold text-xl">

              Final Stage

            </h3>

            <p className="text-slate-500">

              Combine Frontend + Backend + Database + Cloud
              to become a Full Stack Engineer.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SkillDependency;