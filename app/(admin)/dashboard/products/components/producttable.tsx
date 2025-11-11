"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: number
  productName: string
  image: string
  userName: string
  category: string
  size: string
  color: string
  quantity: string
  amount: string
  time: string
}

const mockData: Product[] = [
  {
    id: 1,
    productName: "Man Exclusive T-shirt",
    image: "/images/p1.png",
    userName: "Paula Mora",
    category: "Fashion",
    size: "XL",
    color: "Orange",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 2,
    productName: "Baby Dress",
    image: "/images/p2.png",
    userName: "David Elson",
    category: "Home",
    size: "Small",
    color: "White",
    quantity: "02",
    amount: "$40.00",
    time: "Apr 12, 2025",
  },
  {
    id: 3,
    productName: "Home Accessories",
    image: "/images/p3.png",
    userName: "Stephanie Sharkey",
    category: "Electronics",
    size: "Medium",
    color: "Black",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 5,
    productName: "Double Seat Sofa",
    image: "/images/p4.png",
    userName: "Mary Freund",
    category: "Sports",
    size: "Large",
    color: "B & W",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 6,
    productName: "Double Seat Sofa",
    image: "/images/p5.png",
    userName: "Arlene McCoy",
    category: "Jewellery",
    size: "Small",
    color: "Gold",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 7,
    productName: "Double Seat Sofa",
    image: "/images/p3.png",
    userName: "Albert Flores",
    category: "Vehicles",
    size: "Medium",
    color: "Red",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 8,
    productName: "Double Seat Sofa",
    image: "/images/p7.png",
    userName: "Floyd Miles",
    category: "Electronics",
    size: "Small",
    color: "White",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 9,
    productName: "Double Seat Sofa",
    image: "/images/p8.png",
    userName: "Eleanor Pena",
    category: "Fashion",
    size: "XXL",
    color: "Black",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 10,
    productName: "Double Seat Sofa",
    image: "/images/p4.png",
    userName: "Esther Howard",
    category: "Home",
    size: "Large",
    color: "Blue",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 11,
    productName: "Double Seat Sofa",
    image: "/images/p3.png",
    userName: "Jerome Bell",
    category: "Electronics",
    size: "Small",
    color: "Black",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 12,
    productName: "Double Seat Sofa",
    image: "/images/p2.png",
    userName: "Savannah Nguyen",
    category: "Sports",
    size: "Large",
    color: "Blue",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
  {
    id: 13,
    productName: "Double Seat Sofa",
    image: "/images/p1.png",
    userName: "Jacob Jones",
    category: "Jewellery",
    size: "Medium",
    color: "Silver",
    quantity: "01",
    amount: "$20.00",
    time: "Apr 12, 2025",
  },
]

export default function ProductTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 13
  const totalPages = Math.ceil(mockData.length / itemsPerPage)

  const handleAction = (action: "accept" | "reject", productId: number) => {
    console.log(`${action} product ${productId}`)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const currentData = mockData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-600 font-['Roboto']">Product Upload Request</h2>
        <button className="px-3.5 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm font-medium text-gray-600 font-['Roboto']">
          View All
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
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Qnty
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((product, index) => (
              <tr key={product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {String(product.id).padStart(2, "0")}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.productName}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-sm font-normal text-gray-800 font-['Roboto']">{product.productName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {product.userName}
                </td>
                <td className="px-6 py-4">
                  {product.category}
                </td>
                <td className="px-6 py-4">
                  {product.size}
                </td>
                <td className="px-6 py-4">
                  {product.color}
                </td>
                <td className="px-6 py-4">
                  {product.quantity}
                </td>
                <td className="px-6 py-4">
                  {product.amount}
                </td>
                <td className="px-6 py-4">
                  {product.time}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction("reject", product.id)}
                      className="px-2 py-1 rounded border border-red-600 text-red-600 text-xs font-normal font-['Roboto'] hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction("accept", product.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-xs font-normal font-['Roboto'] hover:bg-red-700 transition-colors"
                    >
                      Accept
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 p-2 rounded-lg border border-gray-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>

        <button
          onClick={() => handlePageChange(1)}
          className={`w-8 h-8 rounded-lg flex justify-center items-center text-sm font-normal font-['Roboto'] transition-colors ${
            currentPage === 1
              ? "bg-gray-50 border border-red-600 text-red-600"
              : "border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          1
        </button>

        <button
          onClick={() => handlePageChange(2)}
          className={`w-8 h-8 rounded-lg flex justify-center items-center text-sm font-normal font-['Roboto'] transition-colors ${
            currentPage === 2
              ? "bg-gray-50 border border-red-600 text-red-600"
              : "border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          2
        </button>

        <div className="w-8 h-8 rounded-lg border border-gray-200 flex justify-center items-center">
          <span className="text-gray-500 text-lg font-semibold">...</span>
        </div>

        <button
          onClick={() => handlePageChange(10)}
          className={`w-8 h-8 rounded-lg flex justify-center items-center text-sm font-normal font-['Roboto'] transition-colors ${
            currentPage === 10
              ? "bg-gray-50 border border-red-600 text-red-600"
              : "border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          10
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 p-2 rounded-lg border border-gray-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}
