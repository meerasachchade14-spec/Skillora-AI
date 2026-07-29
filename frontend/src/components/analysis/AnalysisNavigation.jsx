import {
  FaChartPie,
  FaFileAlt,
  FaSearch,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaProjectDiagram,
  FaCertificate,
  FaKey,
  FaExclamationTriangle,
  FaBalanceScale,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";


const navigationItems = [

  {
    id: "overall-score",
    title: "Overall Score",
    icon: <FaChartPie />,
  },

  {
    id: "resume-summary",
    title: "Summary",
    icon: <FaFileAlt />,
  },

  {
    id: "ats-analysis",
    title: "ATS Analysis",
    icon: <FaSearch />,
  },

  {
    id: "skills",
    title: "Skills",
    icon: <FaCode />,
  },

  {
    id: "experience",
    title: "Experience",
    icon: <FaBriefcase />,
  },

  {
    id: "education",
    title: "Education",
    icon: <FaGraduationCap />,
  },

  {
    id: "projects",
    title: "Projects",
    icon: <FaProjectDiagram />,
  },

  {
    id: "certifications-achievements",
    title: "Certificates",
    icon: <FaCertificate />,
  },

  {
    id: "keyword-match",
    title: "Keywords",
    icon: <FaKey />,
  },

  {
    id: "missing-skills",
    title: "Missing Skills",
    icon: <FaExclamationTriangle />,
  },

  {
    id: "profile-insights",
    title: "Profile Insights",
    icon: <FaBalanceScale />,
  },

  {
    id: "improvement-tips",
    title: "Improve",
    icon: <FaLightbulb />,
  },

  {
    id: "analytics",
    title: "Analytics",
    icon: <FaChartLine />,
  },

];


function AnalysisNavigation({
  activeSection,
  setActiveSection,
}) {


  const handleNavigation = (id) => {

    setActiveSection(id);

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };


  return (

    <div className="analysis-navigation-wrapper">

      <div className="analysis-navigation">

        {navigationItems.map((item) => (

          <button

            key={item.id}

            onClick={() =>
              handleNavigation(item.id)
            }

            className={`analysis-nav-item ${
              activeSection === item.id
                ? "active"
                : ""
            }`}

          >

            <span className="analysis-nav-icon">

              {item.icon}

            </span>


            <span className="analysis-nav-title">

              {item.title}

            </span>

          </button>

        ))}

      </div>

    </div>

  );

}


export default AnalysisNavigation;