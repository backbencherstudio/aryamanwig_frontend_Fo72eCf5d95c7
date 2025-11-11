'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  BarChart3, 
  Rocket, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import Logo from '@/public/icons/logo'

interface MenuItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface SidebarProps {
  isCollapsed: boolean
  isMobileOpen: boolean
  onToggle: () => void
  onMobileToggle: () => void
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Manage Users',
    href: '/dashboard/users',
    icon: Users
  },
  {
    name: 'Manage Products',
    href: '/dashboard/products',
    icon: Package
  },
  {
    name: 'Boost Products',
    href: '/dashboard/boost',
    icon: Rocket
  },
  {
    name: 'Reports & Analytics',
    href: '/dashboard/reports',
    icon: BarChart3
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
]

export default function Sidebar({ isCollapsed, isMobileOpen, onToggle, onMobileToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/25 bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-50
        h-screen bg-gray-50 border-r border-gray-200 flex flex-col
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-72'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="border-gray-200">
          <div className={`flex items-center justify-center gap-2 py-4 h-[78px] ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {isCollapsed ? (
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
            ) : (
              <Logo color="#DE3525" />
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const IconComponent = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    // Close mobile menu when navigating
                    if (window.innerWidth < 1024) {
                      onMobileToggle()
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <IconComponent className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-gray-600'} flex-shrink-0`} />
                  {!isCollapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200">
          <button className={`flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5 text-gray-600 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Log out</span>}
          </button>
        </div>
      </div>
    </>
  )
}
