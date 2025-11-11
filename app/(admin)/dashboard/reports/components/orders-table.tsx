"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type OrderStatus = "completed" | "pending" | "cancelled"

interface Order {
  id: string
  no: string
  productName: string
  productImage: string
  sellerName: string
  buyerName: string
  deliveryAddress: string
  quantity: string
  amount: string
  deliveryDate: string
  status: OrderStatus
}

const mockOrders: Order[] = [
  {
    id: "1",
    no: "01",
    productName: "Man Exclusive T-shirt",
    productImage: "/images/p1.png",
    sellerName: "David Elson",
    buyerName: "Jenny Wilson",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$20.00",
    deliveryDate: "Apr 12, 2025",
    status: "completed",
  },
  {
    id: "2",
    no: "02",
    productName: "Baby Dress",
    productImage: "/images/p2.png",
    sellerName: "Stephanie Sharkey",
    buyerName: "Savannah Nguyen",
    deliveryAddress: "Switzerland",
    quantity: "02",
    amount: "$40.00",
    deliveryDate: "Apr 12, 2025",
    status: "completed",
  },
  {
    id: "3",
    no: "03",
    productName: "Home Accessories",
    productImage: "/images/p3.png",
    sellerName: "Mary Freund",
    buyerName: "Darlene Robertson",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$20.00",
    deliveryDate: "Apr 12, 2025",
    status: "completed",
  },
  {
    id: "4",
    no: "04",
    productName: "Double Seat Sofa",
    productImage: "/images/p4.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$20.00",
    deliveryDate: "Apr 12, 2025",
    status: "completed",
  },
  {
    id: "5",
    no: "05",
    productName: "Gaming Chair",
    productImage: "/images/p5.png",
    sellerName: "John Smith",
    buyerName: "Alice Johnson",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$150.00",
    deliveryDate: "Apr 15, 2025",
    status: "pending",
  },
  {
    id: "6",
    no: "06",
    productName: "Laptop Stand",
    productImage: "/images/p7.png",
    sellerName: "Tech Store",
    buyerName: "Bob Wilson",
    deliveryAddress: "Switzerland",
    quantity: "02",
    amount: "$80.00",
    deliveryDate: "Apr 18, 2025",
    status: "cancelled",
  },
  {
    id: "7",
    no: "07",
    productName: "Wireless Headphones",
    productImage: "/images/p8.png",
    sellerName: "Audio Store",
    buyerName: "Sarah Davis",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$120.00",
    deliveryDate: "Apr 20, 2025",
    status: "completed",
  },
  {
    id: "8",
    no: "08",
    productName: "Smart Watch",
    productImage: "/images/p1.png",
    sellerName: "Tech Gadgets",
    buyerName: "Mike Johnson",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$200.00",
    deliveryDate: "Apr 22, 2025",
    status: "pending",
  },
  {
    id: "9",
    no: "09",
    productName: "Coffee Maker",
    productImage: "/images/p2.png",
    sellerName: "Home Appliances",
    buyerName: "Lisa Brown",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$85.00",
    deliveryDate: "Apr 25, 2025",
    status: "cancelled",
  },
  {
    id: "10",
    no: "10",
    productName: "Desk Lamp",
    productImage: "/images/p3.png",
    sellerName: "Lighting Store",
    buyerName: "Tom Wilson",
    deliveryAddress: "Switzerland",
    quantity: "02",
    amount: "$45.00",
    deliveryDate: "Apr 28, 2025",
    status: "completed",
  },
  {
    id: "11",
    no: "11",
    productName: "Double Seat Sofa",
    productImage: "/images/p4.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: "01",
    amount: "$20.00",
    deliveryDate: "Apr 28, 2025",
    status: "completed",
  },
]

export default function OrdersTable() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("completed")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filter orders based on active tab
  const filteredOrders = mockOrders.filter((order) => order.status === activeTab)

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
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
              <th scope="col" className="px-6 py-3">
                Delivery Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.no}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded"
                      src={order.productImage || "/placeholder.svg"}
                      alt={order.productName}
                    />
                    <div className="text-gray-800 text-sm font-normal font-['Roboto'] leading-tight">{order.productName}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {order.sellerName}
                </td>
                <td className="px-6 py-4">
                  {order.buyerName}
                </td>
                <td className="px-6 py-4">
                  {order.deliveryAddress}
                </td>
                <td className="px-6 py-4">
                  {order.quantity}
                </td>
                <td className="px-6 py-4">
                  {order.amount}
                </td>
                <td className="px-6 py-4">
                  {order.deliveryDate}
                </td>
                <td className="flex items-center px-6 py-4">
                  {getStatusBadge(order.status)}
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
          disabled={currentPage === totalPages}
          className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}
