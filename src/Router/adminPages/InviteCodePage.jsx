import { useState, useEffect } from "react";
import axios from "axios";

const InviteCodePage = () => {
  const [expiresInHours, setExpiresInHours] = useState(24);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [allCodes, setAllCodes] = useState([]);
  const [error, setError] = useState("");

  // Fetch all invite codes
  const fetchInviteCodes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/invites/codes`,
        { withCredentials: true }
      );
      setAllCodes(res.data.codes);
    } catch (err) {
      console.error("Failed to fetch invite codes", err);
    }
  };

  useEffect(() => {
    fetchInviteCodes();
    const interval = setInterval(() => {
      // Countdown refresh
      setAllCodes((prev) => [...prev]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateCode = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/invites/generate`,
        { expiresInHours },
        { withCredentials: true }
      );
      setGeneratedCode(res.data);
      fetchInviteCodes(); // Refresh list
      setError("");
    } catch (err) {
      setError("Failed to generate invite code");
      console.error(err);
    }
  };

  const getRemainingTime = (expiresAt) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry - now;
    if (diff <= 0) return "Expired";
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Generate Invite Code</h2>

      <div className="flex gap-4 items-center mb-6">
        <input
          type="number"
          value={expiresInHours}
          onChange={(e) => setExpiresInHours(e.target.value)}
          className="border rounded-md p-2 w-32"
          placeholder="Expires in (hrs)"
        />
        <button
          onClick={handleGenerateCode}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Generate Code
        </button>
      </div>

      {generatedCode && (
        <div className="mb-6 p-4 border rounded-md bg-green-50">
          <p className="font-bold text-green-700">Code: {generatedCode.code}</p>
          <p className="text-sm text-gray-600">
            Expires At: {new Date(generatedCode.expiresAt).toLocaleString()}
          </p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* Code List Table */}
      <h3 className="text-xl font-semibold mt-10 mb-4">All Invite Codes</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Created By</th>
              <th className="border p-2">Expires In</th>
              <th className="border p-2">Expires At</th>
            </tr>
          </thead>
          <tbody>
            {allCodes.map((code) => (
              <tr key={code._id}>
                <td className="border p-2 text-center font-mono">{code.code}</td>
                <td className="border p-2 text-center">{code.createdBy?.email || "Unknown"}</td>
                <td className="border p-2 text-center text-sm text-blue-700">
                  {getRemainingTime(code.expiresAt)}
                </td>
                <td className="border p-2 text-center">
                  {new Date(code.expiresAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {allCodes.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No codes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InviteCodePage;
