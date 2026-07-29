import { FaSearch, FaFilter } from "react-icons/fa";

function JobFilters() {

  return (

    <div className="bg-white rounded-[28px] p-7 shadow-sm border">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-black">

          Find Your Perfect Job

        </h2>

        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-50 text-sky-600 font-semibold">

          <FaFilter/>

          Advanced Filters

        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <input
          placeholder="Search Jobs..."
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
        />

        <select className="border rounded-xl px-4 py-3">

          <option>Location</option>
          <option>Gandhinagar </option>
          <option>Ahmedabad</option>
          <option>Bangalore</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Remote</option>

        </select>

        <select className="border rounded-xl px-4 py-3">

          <option>Experience</option>
          <option>Intern</option>
          <option>0-2 Years</option>
          <option>2-5 Years</option>
          <option>5+ Years</option>

        </select>

        <button className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-white font-bold">

          <FaSearch className="inline mr-2"/>

          Search

        </button>

      </div>

    </div>

  );

}

export default JobFilters;