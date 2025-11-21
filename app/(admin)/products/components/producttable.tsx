"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { UserService } from "@/userservice/user.service"
import toast from 'react-hot-toast'


interface Product {
  No: string
  id: string
  Product_Name: string
  Product_Photo: string | null
  User_Name: string
  Category: string
  Size: string | null
  Product_Item_Size: string
  Color: string
  Qnty: number
  Amount: string
  Time: string
}

interface PaginationInfo {
  total: number
  page: number
  perPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    perPage: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchProducts = async (page: number = 1) => {
    try {
      setIsLoading(true)
      const res = await UserService.getProductUploadRequest({ page: page, perPage: 10 })
      
      if (res.data.success) {
        setProducts(res.data.data)
        setPagination(res.data.pagination)
        setCurrentPage(res.data.pagination.page)
      }
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage)
  }, [currentPage])

  const handleAction = async (action: "accept" | "reject", productId: string) => {
    try {
      // console.log(`${action} product ${productId}`)

      if (action === "accept") {
        console.log("before the api call ");
        const res = await UserService.acceptProduct(productId);
        toast.success(res.data.message, {
          duration: 4000,
          position: "top-right",
         iconTheme:{
            primary:'#e7000b',
            secondary:'white'
         },
          style: {
         
            color: "#e7000b",
            fontSize: "14px",
            padding: "12px 16px",
            borderRadius: "8px",
          },
        });
      } else if (action === "reject") {
        const res = await UserService.rejectProduct(productId);
            toast.success(res.data.message, {
          duration: 4000,
          position: "top-right",
         iconTheme:{
            primary:'#e7000b',
            secondary:'white'
         },
          style: {
         
            color: "#e7000b",
            fontSize: "14px",
            padding: "12px 16px",
            borderRadius: "8px",
          },
        });
      }

      // Refresh the current page after action
      await fetchProducts(currentPage);
    } catch (error) {
      console.error(`Error ${action} product:`, error);
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page)
    }
  }

  // Function to handle broken images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    // Use a simple placeholder div with background color instead of broken image
    target.style.display = 'none'
    // Create a fallback div if it doesn't exist
    const parent = target.parentElement
    if (parent && !parent.querySelector('.image-fallback')) {
      const fallback = document.createElement('div')
      fallback.className = 'image-fallback w-10 h-10 bg-gray-200 rounded flex items-center justify-center'
      fallback.innerHTML = '📦'
      parent.appendChild(fallback)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading || !pagination.hasPrevPage}
        className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
      </button>
    )

    // Page number buttons
    for (let i = 1; i <= pagination.totalPages; i++) {
      if (
        i === 1 || 
        i === pagination.totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        pagination.totalPages <= 7
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={isLoading}
            className={`w-8 h-8 rounded-lg border flex justify-center items-center text-sm font-normal transition-colors ${
              currentPage === i
                ? "bg-gray-50 border-red-600 text-red-600"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {i}
          </button>
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttons.push(
          <div key={`ellipsis-${i}`} className="w-8 h-8 rounded-lg border border-gray-200 flex justify-center items-center">
            <span className="text-gray-500 text-lg font-semibold">...</span>
          </div>
        )
      }
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pagination.totalPages || isLoading || !pagination.hasNextPage}
        className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </button>
    )

    return buttons
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatAmount = (amount: string) => {
    try {
      return `$${parseFloat(amount).toFixed(2)}`
    } catch {
      return `$${amount}`
    }
  }

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-600 text-lg font-semibold font-sans leading-snug">
          Product Upload Request ({pagination.total})
        </h2>
        <button className="px-3.5 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm font-medium text-gray-600">
          View All
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">There are no product upload requests to display.</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">No</th>
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3">User Name</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Size</th>
                  <th scope="col" className="px-6 py-3">Color</th>
                  <th scope="col" className="px-6 py-3">Qnty</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Time</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.No}
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.Product_Photo ? (
                          <img
                            src={product.Product_Photo}
                            alt={product.Product_Name}
                            className="w-10 h-10 rounded object-cover"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-lg">📦</span>
                          </div>
                        )}
                        <span className="text-sm font-normal text-gray-800">
                          {product.Product_Name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.User_Name}</td>
                    <td className="px-6 py-4">{product.Category}</td>
                    <td className="px-6 py-4">{product.Product_Item_Size || product.Size || "N/A"}</td>
                    <td className="px-6 py-4">{product.Color}</td>
                    <td className="px-6 py-4">{product.Qnty}</td>
                    <td className="px-6 py-4">{formatAmount(product.Amount)}</td>
                    <td className="px-6 py-4">{formatDate(product.Time)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAction("reject", product.id)}
                          className="px-2 py-1 rounded border border-red-600 text-red-600 text-xs font-normal hover:bg-red-50 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleAction("accept", product.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs font-normal hover:bg-red-700 transition-colors"
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

          {/* Pagination - Moved to left side */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-start items-center gap-3 mt-4">
              {renderPaginationButtons()}
            </div>
          )}
        </>
      )}
    </div>
  )
}