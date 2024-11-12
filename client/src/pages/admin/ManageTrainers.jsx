/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CLIENT_API } from "../../redux/actions/authActions";

const ManageTrainers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await CLIENT_API.get("/admin/trainers");

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Error: Data is not an array.");
        }
      } catch (error) {
        setError("Error fetching users data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
      const checkBlockStatus = async () => {
        try {
          const response = await Promise.all(
            users.map(async (user) => {
              const res = await CLIENT_API.get(`/admin/checktrainerStatus/${user._id}`);
              return { ...user, access: res.data.isBlocked };
            })
          );
          setUsers(response);
        } catch (err) {
          setError("Error fetching user status");
        }
      };

      if (users.length) {
        checkBlockStatus();
      }
    }, [users]);

  const handleBlockUnblock = async (userId, currentAccess) => {
    try {
      const response = await CLIENT_API.post("/admin/blockUnblocktrainer", {
        id: userId,
        access: currentAccess,
      });

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, access: !currentAccess } : user
          )
        );
      }
    } catch (err) {
      setError("Error updating user status");
    }
  };

  if (loading) return <p></p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-9">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-2xl font-bold mb-4">Manage Trainers</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg border border-gray-300 dark:bg-neutral-900 bg-neutral-200 overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800 text-left ">
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300 rounded-tl-lg">No.</th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">Name</th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">Email</th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">Added Date</th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">Status</th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } mb-4 rounded-lg border-b dark:border-neutral-700 dark:bg-neutral-900 bg-neutral-200`}
              >
                <td className="px-4 py-2 ">{index + 1}</td>
                <td className="px-4 py-2">{user.Username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{user.access ? "Not-Active" : "Active"}</td>
                <td className="px-4 py-2 ">
                  <button
                    className="text-secondary dark:bg-neutral-800 bg-neutral-300 rounded-lg px-3 py-1"
                    onClick={() => handleBlockUnblock(user._id, user.access)}
                  >
                    {user.access ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTrainers;
