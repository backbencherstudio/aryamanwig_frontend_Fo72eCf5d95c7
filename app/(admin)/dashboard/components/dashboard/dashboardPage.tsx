"use client"
import React from 'react'
import { Users, ShoppingBag, Package, Wallet, TrendingUp } from 'lucide-react'
import AnalyticsSection from './analytics'
import AllUserRequest from './all-user-request'
import { useState } from 'react'
import { RecentOrdersTable } from './recent-orders-table'

type Stat = {
  id: string
  title: string
  value: string
  percent: string
  icon: React.ComponentType<{ className?: string }>
}

function StatCard({ title, value, percent, icon: Icon }: Stat) {
  return (


    <div className="flex-1 p-5 bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)]  outline-Stroke-Color-B&W-White-Shade inline-flex flex-col justify-start items-start gap-6">
      <div className="inline-flex justify-start items-center gap-3">
        <div className="w-10 h-10 p-2.5 bg-red-600/10 rounded-2xl flex justify-center items-center">
          <Icon className="w-5 h-5 text-red-600" />
        </div>
        <div className="justify-start text-Text-Color-B&W-Shade text-lg font-medium font-['Roboto'] leading-relaxed">{title}</div>
      </div>
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-neutral-600 text-3xl font-semibold font-['Roboto'] leading-10">{value}</div>
        <div className="inline-flex flex-col justify-start items-end gap-0.5">
          <div className="self-stretch inline-flex justify-end items-center gap-1">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <div className="text-center justify-start text-green-500 text-base font-normal font-['Roboto'] leading-snug">{percent}</div>
          </div>
          <div className="justify-start text-Text-Color-B&W-Body-Text-Light text-base font-normal font-['Roboto'] leading-snug">Last Month</div>
        </div>
      </div>
    </div>

  )
}

export default function DashboardPage() {
  const [showAllUsers, setShowAllUsers] = useState(false)
  const [showAllOrders, setShowAllOrders] = useState(false)
  const stats: Stat[] = [
    { id: 'users', title: 'Total User', value: '200', percent: '10%', icon: Users },
    { id: 'sell', title: 'Total Sell', value: '$20K', percent: '6%', icon: ShoppingBag },
    { id: 'orders', title: ' Total Order', value: '206', percent: '6%', icon: Package },
    { id: 'revenue', title: 'Total Revenue', value: '$10K', percent: '6%', icon: Wallet }
  ]

  if (showAllUsers) {
    return (
      <div className="max-w-[100vw] mx-auto ">
        <div className="mb-4 flex justify-end">
          <button onClick={() => setShowAllUsers(false)} className="px-3 py-2 bg-white rounded-md border border-gray-200 text-sm">Back</button>
        </div>
        <div className="min-h-[70vh]">
          <AllUserRequest />
        </div>
      </div>
    )
  }

  if (showAllOrders) {
    return (
      <div className="max-w-[100vw] mx-auto ">
        <div className="mb-4 flex justify-end">
          <button onClick={() => setShowAllOrders(false)} className="px-3 py-2 bg-white rounded-md border border-gray-200 text-sm">Back</button>
        </div>
        <div className="min-h-[70vh]">
          <RecentOrdersTable showViewAllButton={false} />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full mx-auto">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>
      <div className="mb-6">
        <AnalyticsSection onViewAll={() => setShowAllUsers(true)} />
      </div>
      <div className="mb-6">
        <RecentOrdersTable limit={4} showViewAllButton onViewAll={() => setShowAllOrders(true)} />
      </div>
    </div>
  )
}
