"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { UserService } from "@/userservice/user.service"

type OrderStatus = "completed" | "pending" | "cancelled"

interface Order {
  No: string;
  Product_Name: string;
  Product_Photo: string;
  Seller_Name: string;
  Buyer_Name: string;
  Delivery_Address: string;
  Qnty: string;
  Amount: string;
  Action: OrderStatus;
}

export default function OrdersTable() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("completed")
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrders,setCurrentOrders] = useState<Order[]>([])
  const [totalPages,setTotalPages] = useState<number>(1);
  const [hasPrev,setHasPrev] = useState<boolean>(false)
  const [hasNext,setHasNext] = useState<boolean>(false)

  // Filter orders based on active tab
  // const filteredOrders = mockOrders.filter((order) => order.status === activeTab)

  // // Calculate pagination
  // const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  // const startIndex = (currentPage - 1) * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  // const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const getCompletedOrders = async()=>{
    try{
      const res = await UserService?.getRecentCompleteOrders({type:activeTab,limit:4,page:currentPage});
      if(res?.data?.success){
        setCurrentOrders(res?.data?.data);
        setTotalPages(res?.data?.pagination?.totalPages);
        setHasNext(res?.data?.pagination?.hasNextPage);
        setHasPrev(res?.data?.pagination?.hasPrevPage);
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getCompletedOrders()
  },[activeTab,currentPage])

  const getStatusBadge = (status: OrderStatus) => {
    switch (status?.toLocaleLowerCase()) {
      case "completed":
        return (
          <div className="w-20 px-2 py-1 bg-lime-50 rounded flex justify-center items-center gap-1">
            <div className="text-lime-700 text-sm font-normal font-['Nunito'] leading-snug">Completed</div>
          </div>
        )
      case "pending":
        return (
          <div className="w-20 px-2 py-1 bg-yellow-50 rounded flex justify-center items-center gap-1">
            <div className="text-yellow-700 text-sm font-normal font-['Nunito'] leading-snug">Pending</div>
          </div>
        )
      case "cancelled":
        return (
          <div className="w-20 px-2 py-1 bg-red-50 rounded flex justify-center items-center gap-1">
            <div className="text-red-700 text-sm font-normal font-['Nunito'] leading-snug">Cancelled</div>
          </div>
        )
    }
  }

  const handleTabChange = (tab: OrderStatus) => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] border border-gray-200 flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-neutral-600 text-lg font-semibold font-['Roboto'] leading-snug">Recent Orders</div>
      </div>

      {/* Tabs */}
      <div className="flex justify-start items-center gap-3">
        <button
          onClick={() => handleTabChange("completed")}
          className={`h-9 px-2 py-1 rounded flex justify-center items-center gap-1 ${
            activeTab === "completed" ? "bg-red-600 text-white" : "border border-zinc-500 text-neutral-600"
          }`}
        >
          <div className="text-sm font-normal font-['Roboto'] leading-snug">Completed Order</div>
        </button>
        <button
          onClick={() => handleTabChange("pending")}
          className={`h-9 px-2 py-1 rounded flex justify-center items-center gap-1 ${
            activeTab === "pending" ? "bg-red-600 text-white" : "border border-zinc-500 text-neutral-600"
          }`}
        >
          <div className="text-sm font-normal font-['Roboto'] leading-snug">Pending Order</div>
        </button>
        <button
          onClick={() => handleTabChange("cancelled")}
          className={`h-9 px-2 py-1 rounded flex justify-center items-center gap-1 ${
            activeTab === "cancelled" ? "bg-red-600 text-white" : "border border-zinc-500 text-neutral-600"
          }`}
        >
          <div className="text-sm font-normal font-['Roboto'] leading-snug">Cancelled Order</div>
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Seller Name
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Address
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order?.No} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.No}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded"
                      src={order?.Product_Photo || "/placeholder.svg"}
                      alt={order?.Product_Name}
                    />
                    <div className="text-gray-800 text-sm font-normal font-['Roboto'] leading-tight">{order?.Product_Name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {order?.Seller_Name}
                </td>
                <td className="px-6 py-4">
                  {order?.Buyer_Name}
                </td>
                <td className="px-6 py-4">
                  {order?.Delivery_Address}
                </td>
                <td className="px-6 py-4">
                  {order?.Qnty}
                </td>
                <td className="px-6 py-4">
                  {order?.Amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-start items-start gap-3">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum
          if (totalPages <= 5) {
            pageNum = i + 1
          } else if (currentPage <= 3) {
            pageNum = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i
          } else {
            pageNum = currentPage - 2 + i
          }

          if (pageNum === 4 && totalPages > 5 && currentPage <= 3) {
            return (
              <div
                key="ellipsis1"
                className="w-8 h-8 p-3 rounded-lg border border-gray-200 flex justify-center items-center gap-2"
              >
                <div className="text-gray-500 text-lg font-semibold leading-relaxed">...</div>
              </div>
            )
          }

          if (pageNum === currentPage - 1 && currentPage > 3 && totalPages > 5) {
            return (
              <div
                key="ellipsis2"
                className="w-8 h-8 p-3 rounded-lg border border-gray-200 flex justify-center items-center gap-2"
              >
                <div className="text-gray-500 text-lg font-semibold leading-relaxed">...</div>
              </div>
            )
          }

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 p-3 rounded-lg border flex justify-center items-center gap-2 ${
                currentPage === pageNum ? "bg-gray-50 border-red-600 text-red-600" : "border-gray-200 text-gray-500"
              }`}
            >
              <div className="text-sm font-normal font-['Roboto'] leading-tight">{pageNum}</div>
            </button>
          )
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <div className="w-8 h-8 p-3 rounded-lg border border-gray-200 flex justify-center items-center gap-2">
              <div className="text-gray-500 text-lg font-semibold leading-relaxed">...</div>
            </div>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="w-8 h-8 p-3 rounded-lg border border-gray-200 flex justify-center items-center gap-2 text-gray-500"
            >
              <div className="text-sm font-normal font-['Roboto'] leading-tight">{totalPages}</div>
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={!hasNext}
          className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}
