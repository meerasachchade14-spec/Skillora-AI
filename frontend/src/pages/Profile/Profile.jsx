import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/profile/PersonalInfo";
import Experience from "../../components/profile/Experience";
import Education from "../../components/profile/Education";
import Projects from "../../components/profile/Projects";
import Certifications from "../../components/profile/Certifications";
import Achievements from "../../components/profile/Achievements";
import SocialLinks from "../../components/profile/SocialLinks";
import Skills from "../../components/profile/Skills";
import ProfileStats from "../../components/profile/ProfileStats";
import AIProfileInsights from "../../components/profile/AIProfileInsights";
import ProfileCompletion from "../../components/profile/ProfileCompletion";
import EditProfile from "../../components/profile/EditProfile";
import ResumeHistory from "../../components/profile/ResumeHistory";
import ActivityTimeline from "../../components/profile/ActivityTimeline";
import CareerGoals from "../../components/profile/CareerGoals";

function Profile() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <ProfileHeader />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Core Profile Information & History */}
        <div className="lg:col-span-2 space-y-8">
          <PersonalInfo />
          <Experience />
          <Education />
          <Projects />
          <Certifications />
          <Achievements />
        </div>

        {/* Right Column: Analytics, Optimization & Progress */}
        <div className="space-y-8">
          <ProfileCompletion />
          <EditProfile />
          <AIProfileInsights />
          <ProfileStats />
          <Skills />
          <CareerGoals />
          <SocialLinks />
          <ResumeHistory />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}

export default Profile;
