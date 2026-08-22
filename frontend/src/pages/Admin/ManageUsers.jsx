import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  Users, 
  Search, 
  UserPlus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  X,
  Mail,
  Shield,
  Key,
  Eye,
  Phone,
  Clock,
  Info,
  BarChart2,
  FileText,
  Cpu,
  ToggleLeft,
  ToggleRight,
  ShieldAlert
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import adminService from "../../services/adminService";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Form states
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "", role: "Student" });
  const [editRole, setEditRole] = useState("Student");

  // Custom confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    type: "warning",
    onConfirm: () => {}
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openConfirm = (title, message, type, confirmText, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      type,
      confirmText,
      cancelText: "Cancel",
      onConfirm: async () => {
        await onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.email || !addForm.password) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      await adminService.createUser(addForm);
      toast.success("User created successfully!");
      setShowAddModal(false);
      setAddForm({ name: "", email: "", password: "", role: "Student" });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create user.");
    }
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setShowEditModal(true);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateUser({
        id: selectedUser.id,
        role: editRole
      });
      toast.success("User role updated successfully!");
      setShowEditModal(false);
      
      // Update selectedUser if open in details
      if (selectedUser) {
        setSelectedUser(prev => ({ ...prev, role: editRole }));
      }
      
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update role.");
    }
  };

  const handleToggleActive = async (user) => {
    const actionText = user.is_active ? "deactivate" : "reactivate";
    const modalType = user.is_active ? "warning" : "info";
    openConfirm(
      `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} User?`,
      `Are you sure you want to ${actionText} user "${user.name}"? ${user.is_active ? "They will not be able to log in or access their dashboard." : "They will immediately regain access to their account."}`,
      modalType === "warning" ? "danger" : "warning",
      `${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      async () => {
        try {
          await adminService.updateUser({
            id: user.id,
            is_active: !user.is_active
          });
          toast.success(`User successfully ${user.is_active ? "deactivated" : "activated"}!`);
          
          // Update local details if open
          if (selectedUser && selectedUser.id === user.id) {
            setSelectedUser(prev => ({ ...prev, is_active: !prev.is_active }));
          }
          
          fetchUsers();
        } catch (err) {
          toast.error(err.response?.data?.error || `Failed to ${actionText} user.`);
        }
      }
    );
  };

  const handleDeleteUser = (user) => {
    openConfirm(
      "Delete User Account?",
      `Are you sure you want to permanently delete user "${user.name}"? This action is irreversible and will delete all their resumes, roadmaps, and reports!`,
      "danger",
      "Delete permanently",
      async () => {
        try {
          await adminService.deleteUser(user.id);
          toast.success("User and all associated data deleted.");
          setShowDetailsModal(false);
          fetchUsers();
        } catch (err) {
          toast.error("Failed to delete user.");
        }
      }
    );
  };

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  // Filter & Search
  const filteredUsers = users.filter(u => {
    const nameMatch = u.name ? u.name.toLowerCase().includes(search.toLowerCase()) : false;
    const emailMatch = u.email ? u.email.toLowerCase().includes(search.toLowerCase()) : false;
    const matchesSearch = nameMatch || emailMatch;
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">User Management</h2>
          <p className="text-sm text-slate-500 font-semibold mt-0.5">Control registered accounts and system privileges</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/10 cursor-pointer text-sm self-start sm:self-center"
        >
          <UserPlus className="w-4.5 h-4.5" />
          Create User account
        </button>
      </div>

      {/* Filters and search */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none text-slate-900 text-sm focus:border-blue-500 focus:bg-white transition"
          />
        </div>
        <div className="w-full md:w-56">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-700 text-sm focus:border-blue-500 focus:bg-white transition font-semibold"
          >
            <option value="all">All Roles</option>
            <option value="Student">Student</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* User table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="font-semibold text-slate-400 text-sm">Querying active user catalog...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center text-slate-500">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-lg">No Users Found</p>
          <p className="text-sm mt-1">Try resetting your filter parameters or create a new user profile.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-[28px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4.5 px-6">Name</th>
                  <th className="py-4.5 px-6">Email</th>
                  <th className="py-4.5 px-6">Role</th>
                  <th className="py-4.5 px-6">Account Status</th>
                  <th className="py-4.5 px-6">Verification</th>
                  <th className="py-4.5 px-6">Joined Date</th>
                  <th className="py-4.5 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-sm text-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-xs uppercase shadow-sm">
                          {user.name ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('') : "U"}
                        </div>
                        <span className="font-bold text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-slate-500">{user.email}</td>
                    <td className="py-4.5 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.role === "Admin" 
                          ? "bg-purple-50 text-purple-600 border border-purple-100" 
                          : user.role === "Recruiter"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4.5 px-6">
                      <button 
                        onClick={() => handleToggleActive(user)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                          user.is_active 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                            : "bg-red-50 text-red-600 border border-red-100"
                        }`}
                        title={user.is_active ? "Click to Deactivate" : "Click to Activate"}
                      >
                        {user.is_active ? "Active" : "Deactivated"}
                      </button>
                    </td>
                    <td className="py-4.5 px-6">
                      {user.is_verified ? (
                        <span className="text-emerald-500 flex items-center gap-1 font-bold">
                          <CheckCircle className="w-4 h-4" /> Verified
                        </span>
                      ) : (
                        <span className="text-amber-500 flex items-center gap-1 font-bold">
                          <XCircle className="w-4 h-4" /> Unverified
                        </span>
                      )}
                    </td>
                    <td className="py-4.5 px-6 text-slate-400 font-medium">
                      {new Date(user.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="flex items-center justify-center gap-2.5">
                        <button
                          onClick={() => handleOpenDetails(user)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                          title="View User Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
                          title="Edit User Role"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-650 p-1 bg-slate-50 hover:bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Create Account</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Register a new profile in the database</p>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="e.g. Meera Sachchade"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    placeholder="user@skillora.ai"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Temporary Password</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={addForm.password}
                    onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-950 font-medium focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Access Role</label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={addForm.role}
                    onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Student">Student</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200 text-sm cursor-pointer"
              >
                Register Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-655 p-1 bg-slate-50 hover:bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Change Privileges</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Update database roles for {selectedUser?.name}</p>
            </div>
            <form onSubmit={handleUpdateRole} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Select Role</label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none text-slate-700 font-semibold focus:border-blue-500 focus:bg-white transition"
                  >
                    <option value="Student">Student (Default)</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Admin">System Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition duration-200 text-sm cursor-pointer"
              >
                Apply Role Change
              </button>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal (Drawer) */}
      <UserDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        user={selectedUser}
        onToggleActive={handleToggleActive}
        onDeleteUser={handleDeleteUser}
      />

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        type={confirmModal.type}
      />
    </div>
  );
}

// Custom Confirmation Modal
function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type }) {
  if (!isOpen) return null;
  const isDanger = type === "danger";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white rounded-[28px] max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-650 p-1 bg-slate-50 hover:bg-slate-100 rounded-full transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-4 rounded-full ${isDanger ? "bg-red-50 border border-red-100 text-red-500" : "bg-amber-50 border border-amber-100 text-amber-500"}`}>
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Destructive actions require confirmation</p>
          </div>
          <p className="text-sm font-semibold text-slate-500 max-w-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 order-2 sm:order-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold transition text-sm border border-slate-200/60 cursor-pointer"
          >
            {cancelText || "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 order-1 sm:order-2 py-3 px-4 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200 text-sm cursor-pointer ${
              isDanger 
                ? "bg-red-600 hover:bg-red-700 shadow-red-500/10" 
                : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10"
            }`}
          >
            {confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

// User Details Modal / Right-side Drawer
function UserDetailsModal({ isOpen, onClose, user, onToggleActive, onDeleteUser }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>
      
      <div className="bg-white h-full w-full max-w-md border-l border-slate-150 p-6 sm:p-8 space-y-6 shadow-2xl relative flex flex-col justify-between z-10 animate-slide-in-right overflow-y-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900">User Profile Details</h3>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-650 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Bio Header */}
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 font-extrabold text-2xl flex items-center justify-center shadow-sm uppercase">
              {user.name ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('') : "U"}
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 leading-tight">{user.name}</h4>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase mt-1.5 ${
                user.role === "Admin" 
                  ? "bg-purple-50 text-purple-600 border border-purple-100" 
                  : user.role === "Recruiter"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}>
                {user.role}
              </span>
            </div>
          </div>

          {/* Metadata details */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">General Information</h5>
            
            <div className="grid grid-cols-1 gap-3.5 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 font-medium w-20">Email:</span>
                <span className="text-slate-800 break-all select-all font-bold">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 font-medium w-20">Phone:</span>
                <span className="text-slate-800">{user.phone_number || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 font-medium w-20">Registered:</span>
                <span className="text-slate-800">
                  {new Date(user.created_at).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 font-medium w-20">Verification:</span>
                <span className={user.is_verified ? "text-emerald-500 flex items-center gap-1 font-bold" : "text-amber-500 flex items-center gap-1 font-bold"}>
                  {user.is_verified ? "Verified OTP" : "Unverified"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 font-medium w-20">Status:</span>
                <span className={user.is_active ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                  {user.is_active ? "Active" : "Deactivated"}
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          {(user.linkedin || user.github || user.bio) && (
            <div className="space-y-3 pt-2">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio & Links</h5>
              {user.bio && (
                <p className="text-xs font-semibold text-slate-550 bg-slate-50 p-3 rounded-xl leading-relaxed italic border border-slate-100">
                  "{user.bio}"
                </p>
              )}
              <div className="flex gap-2">
                {user.linkedin && (
                  <a 
                    href={user.linkedin.startsWith("http") ? user.linkedin : `https://${user.linkedin}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold transition border border-blue-100"
                  >
                    <FaLinkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {user.github && (
                  <a 
                    href={user.github.startsWith("http") ? user.github : `https://${user.github}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-xl text-xs font-bold transition border border-slate-200"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Activity Statistics */}
          <div className="space-y-4 pt-2">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Usage Stats</h5>
            <div className="grid grid-cols-3 gap-3 font-semibold text-xs text-slate-600">
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3 text-center">
                <FileText className="w-4.5 h-4.5 text-indigo-500 mx-auto mb-1" />
                <p className="text-base font-black text-slate-900 leading-none">{user.stats?.resumes_count || 0}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1">Resumes</p>
              </div>
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3 text-center">
                <BarChart2 className="w-4.5 h-4.5 text-purple-500 mx-auto mb-1" />
                <p className="text-base font-black text-slate-900 leading-none">{user.stats?.analyses_count || 0}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1">Analyses</p>
              </div>
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3 text-center">
                <Cpu className="w-4.5 h-4.5 text-emerald-500 mx-auto mb-1" />
                <p className="text-base font-black text-slate-900 leading-none">{user.stats?.matches_count || 0}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1">Matches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons footer */}
        <div className="border-t border-slate-100 pt-5 flex flex-col gap-2.5">
          <button
            onClick={() => onToggleActive(user)}
            className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition cursor-pointer shadow-sm border ${
              user.is_active 
                ? "bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200" 
                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-250"
            }`}
          >
            {user.is_active ? (
              <>
                <ToggleRight className="w-5 h-5" /> Deactivate Account
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5" /> Activate Account
              </>
            )}
          </button>
          
          <button
            onClick={() => onDeleteUser(user)}
            className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition cursor-pointer shadow-sm"
          >
            <Trash2 className="w-4.5 h-4.5" /> Delete User Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
