import React from 'react'
import Image from 'next/image'
import { Bell, ChevronDown, Menu, X } from 'lucide-react'

interface TopbarProps {
  isCollapsed: boolean
  isMobileOpen: boolean
  onToggle: () => void
  onMobileToggle: () => void
}

export default function Topbar({ isCollapsed, isMobileOpen, onToggle, onMobileToggle }: TopbarProps) {
  return (
    <div className="w-full h-[70px] px-4 lg:px-8 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
      {/* Left: Menu Buttons */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileToggle}
          className="lg:hidden w-9 h-9 p-1.5 bg-white rounded-full shadow-xs hover:shadow-md transition-shadow flex items-center justify-center"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Desktop Sidebar Toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex w-9 h-9 p-1.5 bg-white rounded-full shadow-xs hover:shadow-md transition-shadow items-center justify-center"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="w-9 h-9 p-1.5 bg-white rounded-full shadow-xs hover:shadow-md transition-shadow">
          <Bell className="w-6 h-6 text-gray-600" />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-xs hover:shadow-md transition-shadow">
          <Image 
            className="w-8 h-8 rounded-full" 
            src="/images/avatar.png" 
            alt="Courtney Henry"
            width={32}
            height={32}
          />
          <span className="text-sm font-medium text-gray-900">Courtney Henry</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  )
}
