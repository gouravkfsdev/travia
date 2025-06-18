"use client";

import {
  faDollarSign,
  faShoppingCart,
  faUsers,
  faChartLine,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/Layout";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$ 45,231",
      change: "+20.1 %",
      icon: faDollarSign,
      color: "text-green-700",
      bg: "bg-green-700",
      hoverbg: "hover:bg-green-600",
      hovertext: "hover:text-white",
    },
    {
      title: "Orders",
      value: "2,356",
      change: "+15.3 %",
      icon: faShoppingCart,
      color: "text-orange-800",
      bg: "bg-orange-600",
      hoverbg: "hover:bg-orange-500",
      hovertext: "hover:text-white",
    },
    {
      title: "Users",
      value: "12,234",
      change: "+8.2 %",
      icon: faUsers,
      color: "text-purple-700",
      bg: "bg-purple-700",
      hoverbg: "hover:bg-purple-600",
      hovertext: "hover:text-white",
    },
    {
      title: "Growth",
      value: "24.5 %",
      change: "+12.5 %",
      icon: faChartLine,
      color: "text-red-700",
      bg: "bg-red-700",
      hoverbg: "hover:bg-red-600",
      hovertext: "hover:text-white",
    },
  ];

  const recentOrders = [
    {
      id: "#1234",
      customer: "John Doe",
      amount: "$249.99",
      status: "Completed",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      amount: "$149.99",
      status: "Pending",
    },
    {
      id: "#1236",
      customer: "Bob Johnson",
      amount: "$99.99",
      status: "Processing",
    },
    {
      id: "#1237",
      customer: "Alice Brown",
      amount: "$199.99",
      status: "Completed",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-[#184062]">Dashboard</h2>
          <select className="px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white text-[#184062] ">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`
                bg-white p-4 rounded-lg shadow-sm 
                transition-all duration-300 hover:shadow-md cursor-pointer
                group ${stat.hoverbg}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`
                      text-sm font-bold 
                      transition-colors duration-300 
                      group-hover:text-white text-[#184062]
                    `}
                  >
                    {stat.title}
                  </p>
                  <p
                    className={`
                      text-2xl font-bold mt-1 
                      transition-colors duration-300 
                      group-hover:text-white text-orange-900
                    `}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`
                      text-sm font-medium mt-1 
                      transition-colors duration-300 
                      group-hover:text-white ${stat.color}
                    `}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="h-6 w-6 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Placeholder */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-900">
                Revenue Trend
              </h3>
              <FontAwesomeIcon
                icon={faChartBar}
                className="h-5 w-5 text-orange-700"
              />
            </div>
            <div
              className="h-64 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#eec696" }}
            >
              <p className="text-orange-800 font-medium">
                Chart Component Would Go Here
              </p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">
              Recent Orders
            </h3>
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: "#eec696" }}
                >
                  <div>
                    <p className="font-medium text-orange-900">{order.id}</p>
                    <p className="text-sm text-orange-700">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-orange-900">
                      {order.amount}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
