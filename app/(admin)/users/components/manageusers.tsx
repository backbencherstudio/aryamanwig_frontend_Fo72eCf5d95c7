"use client"
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import DeleteModal from "../../components/common/delete-modal"
import { UserService } from "@/userservice/user.service"

const userData = [
  {
    id: "01",
    userName: "Paula Mora",
    email: "jessica.hanson@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 10,
    soldProducts: 10,
    uploadedProducts: 10,
  },
  {
    id: "02",
    userName: "David Elson",
    email: "kenzi.lawson@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 5,
    soldProducts: 5,
    uploadedProducts: 5,
  },
  {
    id: "03",
    userName: "Stephanie Sharkey",
    email: "willie.jennings@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 32,
    soldProducts: 32,
    uploadedProducts: 32,
  },
  {
    id: "05",
    userName: "Mary Freund",
    email: "debbie.baker@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 20,
    soldProducts: 20,
    uploadedProducts: 20,
  },
  {
    id: "06",
    userName: "Arlene McCoy",
    email: "jackson.graham@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 15,
    soldProducts: 15,
    uploadedProducts: 15,
  },
  {
    id: "07",
    userName: "Albert Flores",
    email: "curtis.weaver@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 23,
    soldProducts: 23,
    uploadedProducts: 23,
  },
  {
    id: "08",
    userName: "Floyd Miles",
    email: "michael.mitc@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 21,
    soldProducts: 21,
    uploadedProducts: 21,
  },
  {
    id: "09",
    userName: "Eleanor Pena",
    email: "debra.holt@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 3,
    soldProducts: 3,
    uploadedProducts: 3,
  },
  {
    id: "10",
    userName: "Esther Howard",
    email: "sara.cruz@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 32,
    soldProducts: 32,
    uploadedProducts: 32,
  },
  {
    id: "11",
    userName: "Jerome Bell",
    email: "alma.lawson@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 13,
    soldProducts: 13,
    uploadedProducts: 13,
  },
  {
    id: "12",
    userName: "Savannah Nguyen",
    email: "bill.sanders@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 21,
    soldProducts: 21,
    uploadedProducts: 21,
  },
  {
    id: "13",
    userName: "Jacob Jones",
    email: "nathan.roberts@example.com",
    location: "St.Gallen& Eastern Switzerland",
    boughtProducts: 56,
    soldProducts: 56,
    uploadedProducts: 56,
  },
]


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


export default function ManageUsers() {

  
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages,setTotalPages]= useState<number>(1)
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

    const fetchManageUsers = async ()=>{
      try{
        const res = await UserService.getUsers( {page:currentPage,perPage:2})
        if(res.data.success){
          setUsers(res.data.data)
          setTotalPages(res.data.pagination.totalPages)
          // console.log(res.data.pagination)
        }
        console.log(res.data.success)
      }catch(err){
          console.log(err)
      }
      
    }

  useEffect(() =>  {
    fetchManageUsers()
  }, [ ])

  const itemsPerPage = 10
  // const totalPages = Math.ceil(users.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = users.slice(startIndex, endIndex)

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
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== deleteModal.userId))
      
      const updatedUsers = users.filter(user => user.id !== deleteModal.userId)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      
      const newTotalPages = Math.ceil(updatedUsers.length / itemsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }
      
      console.log(`User ${deleteModal.userId} deleted successfully from both database and localStorage`)
      
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

  const renderPaginationButtons = () => {
    const buttons = []
    
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
      </button>
    )

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 p-1 rounded-lg border flex justify-center items-center ${
              currentPage === i
                ? 'bg-gray-50 border-red-600'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className={`text-sm font-normal ${
              currentPage === i ? 'text-red-600' : 'text-gray-500'
            }`}>
              {i}
            </span>
          </button>
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttons.push(
          <div key={`ellipsis-${i}`} className="w-8 h-8 p-1 rounded-lg border border-gray-200 flex justify-center items-center">
            <span className="text-gray-500 text-lg font-semibold">...</span>
          </div>
        )
      }
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
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
          Active Users ({users.length})
        </h2>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <MoreHorizontal className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">All users have been deleted or there are no users to display.</p>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bought Products
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sold Products
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Uploaded Products
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>


               
                {/* interface User {
  id: string;
  email: string;
  user_name: string;
  location?: string;             
  bought_products: number;
  sold_products: number;
  uploaded_products: number;
  created_at?: Date;             
  updated_at?: Date;
} */}
                
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {startIndex + index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {user.user_name}
                    </td>
                    <td className="px-6 py-4">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      {user.location}
                    </td>
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

          <div className="flex justify-start items-center gap-3 mt-4">
            {renderPaginationButtons()}
          </div>
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