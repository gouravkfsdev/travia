"use client";
import Layout from "../../components/Layout";
import { useState } from "react";

export default function UsersPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout>
      <div className="flex h-screen bg-gray-50">
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-[#184062] mb-4">Users</h1>

          {/* Example user content */}
          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              User List
            </h2>

            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded">
              <thead className="text-xs text-white uppercase bg-[#184062]">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    #
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-t hover:bg-gray-100">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">User {i + 1}</td>
                    <td className="px-4 py-2">user{i + 1}@example.com</td>
                    <td className="px-4 py-2">Admin</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </Layout>
  );
}
