'use client'

import React, { useState } from 'react'
import { X, Trash2 } from 'lucide-react'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  itemName?: string
  isLoading?: boolean
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  isLoading = false
}: DeleteModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  if (!isOpen) return null

  const handleConfirm = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onConfirm()
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-red-50 flex items-center justify-center transition-transform duration-300 ${
              isAnimating ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
            }`}>
              <Trash2 className={`w-5 h-5 text-red-600 transition-colors duration-300 ${
                isAnimating ? 'text-red-700' : 'text-red-600'
              }`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-2">{description}</p>
          {itemName && (
            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border">
              <span className="font-medium">Item:</span> {itemName}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}