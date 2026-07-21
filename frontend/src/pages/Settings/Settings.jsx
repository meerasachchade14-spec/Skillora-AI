import { useState } from 'react';

import SettingsSidebar from '../../components/settings/SettingsSidebar';

import AccountSettings from '../../components/settings/AccountSettings';
import ChangePassword from '../../components/settings/ChangePassword';
import NotificationSettings from '../../components/settings/NotificationSettings';
import PrivacySettings from '../../components/settings/PrivacySettings';
import ThemeSettings from '../../components/settings/ThemeSettings';
import LanguageSettings from '../../components/settings/LanguageSettings';
import AISettings from '../../components/settings/AISettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import ConnectedAccounts from '../../components/settings/ConnectedAccounts';
import DataManagement from '../../components/settings/DataManagement';
import HelpSupport from '../../components/settings/HelpSupport';
import AboutSkillora from '../../components/settings/AboutSkillora';

function Settings() {
  const [activeSection, setActiveSection] = useState('account');

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings />;

      case 'password':
        return <ChangePassword />;

      case 'notifications':
        return <NotificationSettings />;

      case 'privacy':
        return <PrivacySettings />;

      case 'theme':
        return <ThemeSettings />;

      case 'language':
        return <LanguageSettings />;

      case 'ai':
        return <AISettings />;

      case 'security':
        return <SecuritySettings />;

      case 'connected':
        return <ConnectedAccounts />;

      case 'data':
        return <DataManagement />;

      case 'help':
        return <HelpSupport />;

      case 'about':
        return <AboutSkillora />;

      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <SettingsSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {renderSection()}
          </div>

      </div>
    </div>
  );
}

export default Settings;