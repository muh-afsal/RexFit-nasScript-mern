import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
// import MemberDashboard from "./pages/member/MemberDashboard";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import AdminDashboard from "./pages/admin/adminDashboard";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import TrainerLayout from "./pages/trainer/TrainerLayout";
import MemberLayout from "./pages/member/MemberLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageClasses from "./pages/admin/ManageClasses";
import ManageTrainers from "./pages/admin/ManageTrainers";
import ManageClients from "./pages/admin/ManageClients";
import ManageMembers from "./pages/trainer/ManageClients";
import PTprograms from "./pages/trainer/PTprograms";
import ChatTrainer from "./pages/trainer/ChatTrainer";
import MemberDashboard from "./pages/member/MemberDashboard";
import MyProgress from "./pages/member/MyProgress";
import ChatMember from "./pages/member/ChatMember";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route element={<ProtectedRoutes />}>
      <Route element={<RoleBasedRoutes allowedRoles={["member"]} />}>
        <Route path="" element={<Navigate to="member" replace />} />
        <Route path="/member" element={<MemberLayout />}>
           <Route index element={<MemberDashboard/>} />
           <Route path="progress" element={<MyProgress />} />
           <Route path="chat" element={<ChatMember />} />
      </Route>
      </Route>
      <Route element={<RoleBasedRoutes allowedRoles={["trainer"]} />}>
        <Route path="" element={<Navigate to="trainer" replace />} />
        <Route path="/trainer" element={<TrainerLayout />} >
           <Route index element={<TrainerDashboard/>} />
           <Route path="clients" element={<ManageMembers />} />
           <Route path="programs" element={<PTprograms />} />
           <Route path="chat" element={<ChatTrainer />} />
       </Route>
      </Route>
     <Route element={<RoleBasedRoutes allowedRoles={["admin"]} />}>
        <Route path="" element={<Navigate to="admin" replace />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="clients" element={<ManageClients />} />
          <Route path="trainers" element={<ManageTrainers />} />
          <Route path="classes" element={<ManageClasses />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
