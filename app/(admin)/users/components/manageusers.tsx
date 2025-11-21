"use client"
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import DeleteModal from "../../components/common/delete-modal"
import { UserService } from "@/userservice/user.service"

interface User {
  id: string;
  email: string;
  user_name: string;
  location?: string;             
  bought_products: number;
  sold_products: number;
  uploaded_products: number;
  created_at?: Date;            
  updated_at?: Date;
}

interface PaginationInfo {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  perPage: number;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(1) // Track perPage from API
  const [isLoading, setIsLoading] = useState(false)
  
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    userId: string | null
    userName: string | null
  }>({
    isOpen: false,
    userId: null,
    userName: null
  })
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchManageUsers = async (page: number = 1) => {
    try {
      setIsLoading(true)
      // Pass the current page to the API call
      const res = await UserService.getUsers({ page: page, perPage: 3 }) // Using 1 item per page
      


      if (res.data.success) {
        setUsers(res.data.data)
        setTotalPages(res.data.pagination.totalPages)
  
        setTotalUsers(res.data.pagination.totalItems || res.data.data.length)
        
        // Set the perPage value from API response
        if (res.data.pagination.perPage) {
          setPerPage(res.data.pagination.perPage)
        }
        
        console.log("Pagination data:", res.data.pagination)
      }
    } catch (err) {
      console.log("Error fetching users:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchManageUsers(currentPage)
  }, [currentPage]) // Re-fetch when currentPage changes

  const handleDeleteClick = (userId: string, userName: string) => {
    setDeleteModal({
      isOpen: true,
      userId,
      userName
    })
  }

  const deleteUserFromDatabase = async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(`User ${userId} deleted from database`)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.userId) return
    
    setIsDeleting(true)
    
    try {
      await deleteUserFromDatabase(deleteModal.userId)
      
      // After deletion, refetch the current page to get updated data
      await fetchManageUsers(currentPage)
      
      console.log(`User ${deleteModal.userId} deleted successfully`)
      
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user. Please try again.')
    } finally {
      setIsDeleting(false)
      setDeleteModal({
        isOpen: false,
        userId: null,
        userName: null
      })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      userId: null,
      userName: null
    })
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Calculate row number based on current page and perPage
  const calculateRowNumber = (index: number) => {
    return (currentPage - 1) * perPage + index + 1
  }

  const renderPaginationButtons = () => {
    const buttons = []
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
      </button>
    )

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        totalPages <= 7 // Show all pages if total pages is small
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={isLoading}
            className={`w-8 h-8 p-1 rounded-lg border flex justify-center items-center ${
              currentPage === i
                ? 'bg-gray-50 border-red-600'
                : 'border-gray-200 hover:bg-gray-50'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className={`text-sm font-normal ${
              currentPage === i ? 'text-red-600' : 'text-gray-500'
            }`}>
              {i}
            </span>
          </button>
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        // Ellipsis for skipped pages
        buttons.push(
          <div key={`ellipsis-${i}`} className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center">
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
        disabled={currentPage === totalPages || isLoading}
        className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </button>
    )

    return buttons
  }

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-600 text-lg font-semibold font-sans leading-snug">
          Active Users ({totalUsers})
        </h2>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages} • {perPage} items per page
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <MoreHorizontal className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">There are no users to display.</p>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">No</th>
                  <th scope="col" className="px-6 py-3">User Name</th>
                  <th scope="col" className="px-6 py-3">Email Address</th>
                  <th scope="col" className="px-6 py-3">Location</th>
                  <th scope="col" className="px-6 py-3">Bought Products</th>
                  <th scope="col" className="px-6 py-3">Sold Products</th>
                  <th scope="col" className="px-6 py-3">Uploaded Products</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {calculateRowNumber(index)}
                    </th>
                    <td className="px-6 py-4">{user.user_name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.location || "N/A"}</td>
                    <td className="px-6 py-4">
                      {user.bought_products.toString().padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      {user.sold_products.toString().padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      {user.uploaded_products.toString().padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDeleteClick(user.id, user.user_name)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-start items-center gap-3 mt-4">
              {renderPaginationButtons()}
            </div>
          )}
        </>
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        itemName={deleteModal.userName || undefined}
        isLoading={isDeleting}
      />
          
    </div>
  )
}