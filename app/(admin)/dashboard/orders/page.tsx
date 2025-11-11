import React from 'react'
import { RecentOrdersTable } from '../components/dashboard/recent-orders-table'

export default function OrdersPage() {
  return (
    <div className="w-full">
      <RecentOrdersTable showViewAllButton={false} />
    </div>
  )
}

