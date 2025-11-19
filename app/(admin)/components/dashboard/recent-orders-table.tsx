"use client"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useMemo, useState } from "react"

interface Order {
  id: string
  productName: string
  productImage: string
  sellerName: string
  buyerName: string
  deliveryAddress: string
  quantity: number
  amount: number
  deliveryDate: string
  status: "Completed" | "Pending" | "Cancelled"
}

const orders: Order[] = [
  {
    id: "01",
    productName: "Man Exclusive T-shirt",
    productImage: "/images/p1.png",
    sellerName: "Paula Mora",
    buyerName: "Jenny Wilson",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Completed",
  },
  {
    id: "02",
    productName: "Baby Dress",
    productImage: "/images/p2.png",
    sellerName: "David Elson",
    buyerName: "Savannah Nguyen",
    deliveryAddress: "Switzerland",
    quantity: 2,
    amount: 40.0,
    deliveryDate: "Apr 12, 2025",
    status: "Pending",
  },
  {
    id: "03",
    productName: "Home Accessories",
    productImage: "/images/p3.png",
    sellerName: "Stephanie Sharkey",
    buyerName: "Darlene Robertson",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Cancelled",
  },
  {
    id: "04",
    productName: "Home Accessories",
    productImage: "/images/p4.png",
    sellerName: "Stephanie Sharkey",
    buyerName: "Darlene Robertson",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Completed",
  },
  {
    id: "05",
    productName: "Double Seat Sofa",
    productImage: "/images/p5.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Completed",
  },
  {
    id: "06",
    productName: "Double Seat Sofa",
    productImage: "/images/p7.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Completed",
  },
  {
    id: "07",
    productName: "Double Seat Sofa",
    productImage: "/images/p8.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Pending",
  },
  {
    id: "08",
    productName: "Double Seat Sofa",
    productImage: "/images/p1.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Cancelled",
  },
  {
    id: "09",
    productName: "Double Seat Sofa",
    productImage: "/images/p2.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Completed",
  },
  {
    id: "10",
    productName: "Double Seat Sofa",
    productImage: "/images/p3.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Pending",
  },
  {
    id: "11",
    productName: "Double Seat Sofa",
    productImage: "/images/p4.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Cancelled",
  },
  {
    id: "12",
    productName: "Double Seat Sofa",
    productImage: "/images/p5.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Pending",
  },
  {
    id: "13",
    productName: "Double Seat Sofa",
    productImage: "/images/p7.png",
    sellerName: "Mary Freund",
    buyerName: "Eleanor Pena",
    deliveryAddress: "Switzerland",
    quantity: 1,
    amount: 20.0,
    deliveryDate: "Apr 12, 2025",
    status: "Completed",
  },
]

function StatusBadge({ status }: { status: Order["status"] }) {
  const statusConfig = {
    Completed: {
      bg: "bg-lime-50",
      text: "text-lime-700",
      label: "Completed",
    },
    Pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      label: "Pending",
    },
    Cancelled: {
      bg: "bg-rose-50",
      text: "text-red-500",
      label: "Cancelled",
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={`px-2 py-1 rounded text-sm font-normal ${config.bg} ${config.text} inline-flex justify-center items-center min-w-[80px]`}
    >
      {config.label}
    </div>
  )
}

type RecentOrdersTableProps = {
  limit?: number
  showViewAllButton?: boolean
  viewAllHref?: string
  onViewAll?: () => void
}

export function RecentOrdersTable({ limit, showViewAllButton = true, viewAllHref, onViewAll }: RecentOrdersTableProps) {
  const pageSize = 10
  const [page, setPage] = useState(1)

  const isLimited = typeof limit === "number"
  const totalPages = isLimited ? 1 : Math.ceil(orders.length / pageSize)

  const rows = useMemo(() => {
    if (isLimited) {
      return orders.slice(0, limit as number)
    }
    const start = (page - 1) * pageSize
    return orders.slice(start, start + pageSize)
  }, [isLimited, limit, page])

  const goToPage = (p: number) => {
    if (isLimited) return
    if (p < 1 || p > totalPages) return
    setPage(p)
  }

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-600 font-sans">Recent Orders</h2>
        {showViewAllButton && (
          viewAllHref ? (
            <a href={viewAllHref} className="px-3.5 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              View All
            </a>
          ) : (
            <button onClick={onViewAll} className="px-3.5 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              View All
            </button>
          )
        )}
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
                Qnty
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
            {rows.map((order) => (
              <tr key={order.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.id}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={order.productImage || "/placeholder.svg"}
                      alt={order.productName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span className="text-sm text-gray-800 font-sans">{order.productName}</span>
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
                  {order.quantity.toString().padStart(2, "0")}
                </td>
                <td className="px-6 py-4">
                  ${order.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  {order.deliveryDate}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLimited && (
      <div className="flex items-center gap-3 mt-4">
        <button
          aria-label="Previous"
          onClick={() => goToPage(page - 1)}
          className="w-8 h-8 p-2 rounded-lg border border-gray-200 flex justify-center items-center hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={page === 1}
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1
          const isActive = p === page
          return (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`w-8 h-8 p-2 rounded-lg flex justify-center items-center border ${
                isActive ? "bg-gray-50 border-red-600" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className={`text-sm font-normal ${isActive ? "text-red-600" : "text-gray-500"}`}>{p}</span>
            </button>
          )
        })}

        <button
          aria-label="Next"
          onClick={() => goToPage(page + 1)}
          className="w-8 h-8 p-2 rounded-lg border border-gray-200 flex justify-center items-center hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={page === totalPages}
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      )}
    </div>
  )
}
