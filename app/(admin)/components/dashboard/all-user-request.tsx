"use client"

const userData = [
  { name: "Paula Mora", email: "paula@gmail.com", location: "Switzerland" },
  { name: "David Elson", email: "david@sample.com", location: "Switzerland" },
  { name: "Stephanie Sharkey", email: "stephanie@sample.com", location: "Switzerland" },
  { name: "Darrell Steward", email: "debra.holt@example.com", location: "Switzerland" },
  { name: "Dianne Russell", email: "jackson.graham@example.com", location: "Switzerland" },
  { name: "Eleanor Pena", email: "michael.mitc@example.com", location: "Switzerland" },
  { name: "Floyd Miles", email: "georgia.young@example.com", location: "Switzerland" },
  { name: "Jacob Jones", email: "felicia.reid@example.com", location: "Switzerland" },
  { name: "Leslie Alexander", email: "jessica.hanson@example.com", location: "Switzerland" },
  { name: "Courtney Henry", email: "kenzi.lawson@example.com", location: "Switzerland" },
]

type TableProps = { compact?: boolean; onReject?: (name: string) => void; onAccept?: (name: string) => void }

export function AllUserRequestTable({ compact = false, onReject, onAccept }: TableProps) {
  const thPad = compact ? 'px-4 py-3' : 'px-6 py-5'
  const tdPad = compact ? 'px-4 py-3' : 'px-6 py-5'
  const textSize = compact ? 'text-xs' : 'text-sm'
  const handleReject = onReject ?? ((name: string) => console.log(`Rejected: ${name}`))
  const handleAccept = onAccept ?? ((name: string) => console.log(`Accepted: ${name}`))

  const locationResponsiveHeader = compact ? 'hidden md:table-cell' : ''
  const locationResponsiveCell = compact ? 'hidden md:table-cell' : ''

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {user.name}
              </th>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4">
                {user.location}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleReject(user.name)}
                    className="w-16 px-2 py-1 rounded border border-red-600 flex justify-center items-center gap-1 hover:bg-red-50 transition-colors"
                  >
                    <div className={`${textSize} text-red-600 font-normal font-['Roboto'] leading-snug`}>Reject</div>
                  </button>
                  <button
                    onClick={() => handleAccept(user.name)}
                    className="w-16 px-2 py-1 bg-red-600 rounded flex justify-center items-center gap-1 hover:bg-red-700 transition-colors"
                  >
                    <div className={`${textSize} text-white font-normal font-['Roboto'] leading-snug`}>Accept</div>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AllUserRequest() {
  const handleReject = (name: string) => { console.log(`Rejected: ${name}`) }
  const handleAccept = (name: string) => { console.log(`Accepted: ${name}`) }

  return (
    <div className="self-stretch p-4 bg-gray-50 rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] border border-gray-200 flex flex-col gap-4 overflow-hidden">
      <div className="self-stretch flex justify-between items-center">
        <div className="text-neutral-600 text-lg font-semibold font-['Roboto'] leading-snug">New User Request</div>
        <div className="w-[515.50px] h-9" />
      </div>

      <div className="self-stretch rounded overflow-hidden">
        <AllUserRequestTable onReject={handleReject} onAccept={handleAccept} />
      </div>
    </div>
  )
}
