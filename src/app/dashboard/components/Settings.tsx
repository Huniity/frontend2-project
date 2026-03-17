import { RiUserLine, RiShieldKeyholeLine } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdOutlineContactMail, MdOutlineLanguage } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiLink } from "react-icons/bi";

const settingsItems = [
  { icon: RiUserLine, label: "Profile Photo" },
  { icon: TbPasswordFingerprint, label: "Change Password" },
  { icon: MdOutlineContactMail, label: "Contact Info" },
  { icon: AiOutlineStar, label: "Preferences" },
  { icon: IoNotificationsOutline, label: "Notifications" },
  { icon: RiShieldKeyholeLine, label: "Privacy" },
  { icon: MdOutlineLanguage, label: "Language", description: "Coming Soon" },
  { icon: BiLink, label: "Connect Accounts", description: "Coming Soon" },
];

export default function Settings() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-2xl font-made-outer-alt font-bold italic mb-4">Profile Settings</h1>
        <div className="space-y-4 text-sm text-gray-400 leading-relaxed max-w-xl font-made-outer">
          <p>Manage your profile details and account preferences in a simple, user-friendly way.</p>
          <p>Update your name, email, or password securely. Changes are saved instantly so you&apos;re always up to date.</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-y-14 gap-x-10 max-w-4xl">
        {settingsItems.map((item) => (
          <button key={item.label} className="flex flex-col items-center gap-3 group cursor-pointer border border-white/15 rounded-2xl py-8 px-4 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300">
            <item.icon className="text-gray-400 group-hover:text-white transition-colors duration-200" size={32} />
            <span className="text-sm font-bold text-white font-made-outer">{item.label}</span>
            {item.description && <p className="text-xs text-gray-500 font-made-outer">{item.description}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}