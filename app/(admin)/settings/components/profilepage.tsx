"use client"

import { useState, useRef } from "react"
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form"
import { Edit, ChevronDown, Upload, X } from "lucide-react"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  language: string
}

const PROFILE_IMAGE_URL = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"

const LANGUAGE_OPTIONS = ["English", "Spanish", "French", "German"]

export default function ProfilePage() {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileImage, setProfileImage] = useState<string>(PROFILE_IMAGE_URL)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const defaultValues: ProfileData = {
    firstName: "Courtney",
    lastName: "Henry",
    email: "debra.holt@example.com",
    phone: "016735555728",
    address: "2464 Royal Ln. Mesa, New Jersey 45463",
    language: "English",
  }

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ProfileData>({
    defaultValues
  })

  const watchedValues = watch()

  const onSubmit = (data: ProfileData) => {
    console.log("Form submitted with data:", data)
    console.log("Profile image:", profileImage)
    setIsEditingPersonalInfo(false)
    setIsEditingProfile(false)
  }

  const handleSave = () => {
    handleSubmit(onSubmit)()
  }

  const handleCancel = () => {
    reset(defaultValues)
    setProfileImage(PROFILE_IMAGE_URL)
    setImagePreview(null)
    setIsEditingPersonalInfo(false)
    setIsEditingProfile(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed:', event.target.files)
    const file = event.target.files?.[0]
    if (file) {
      console.log('Selected file:', file.name, file.type, file.size)
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        console.log('Image loaded successfully')
        setImagePreview(result)
        setProfileImage(result)
      }
      reader.onerror = () => {
        console.error('Error reading file')
        alert('Error reading the image file')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    console.log('Remove image button clicked')
    setProfileImage(PROFILE_IMAGE_URL) // Reset to original default
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleChangeImageClick = () => {
    console.log('Change image button clicked')
    console.log('File input ref:', fileInputRef.current)
    fileInputRef.current?.click()
  }

  const isInEditMode = isEditingPersonalInfo || isEditingProfile

  return (
    <div className=" flex justify-center">
      <div className="w-full p-4 bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col gap-4">
        {/* Profile Section */}
        <ProfileSection
          isEditing={isEditingProfile}
          onEdit={() => setIsEditingProfile(true)}
          profileData={watchedValues}
          profileImage={profileImage}
          imagePreview={imagePreview}
          fileInputRef={fileInputRef}
          onImageUpload={handleImageUpload}
          onChangeImageClick={handleChangeImageClick}
          onRemoveImage={handleRemoveImage}
        />

        {/* Personal Info Section */}
        <PersonalInfoSection
          isEditing={isEditingPersonalInfo}
          onEdit={() => setIsEditingPersonalInfo(true)}
          register={register}
          errors={errors}
          watchedValues={watchedValues}
        />

        {/* Action Buttons */}
        {isInEditMode && <ActionButtons onSave={handleSave} onCancel={handleCancel} />}
      </div>
    </div>
  )
}

function ProfileSection({
  isEditing,
  onEdit,
  profileData,
  profileImage,
  imagePreview,
  fileInputRef,
  onImageUpload,
  onChangeImageClick,
  onRemoveImage,
}: {
  isEditing: boolean
  onEdit: () => void
  profileData: ProfileData
  profileImage: string
  imagePreview: string | null
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeImageClick: () => void
  onRemoveImage: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="My Profile" />

      <div className="px-5 py-6 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-start">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img 
              className="w-20 h-20 rounded-full object-cover" 
              src={imagePreview || profileImage || "https://via.placeholder.com/80x80/cccccc/666666?text=No+Image"} 
              alt="Profile" 
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "https://via.placeholder.com/80x80/cccccc/666666?text=No+Image"
              }}
            />
            {isEditing && (
              <div 
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors" 
                onClick={(e) => {
                  e.preventDefault()
                  console.log('X button on image clicked')
                  onRemoveImage()
                }}
              >
                <X className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2">
              <ProfileImageButtons 
                onChangeImageClick={onChangeImageClick}
                onRemoveImage={onRemoveImage}
              />
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <ProfileInfo name={`${profileData.firstName} ${profileData.lastName}`} email={profileData.email} />
          )}
        </div>

        {!isEditing && <EditButton onClick={onEdit} />}
      </div>
    </div>
  )
}

function ProfileImageButtons({
  onChangeImageClick,
  onRemoveImage,
}: {
  onChangeImageClick: () => void
  onRemoveImage: () => void
}) {
  return (
    <div className="flex gap-4">
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault()
          console.log('Change button clicked')
          onChangeImageClick()
        }}
        className="px-3.5 py-2 bg-red-600 rounded-md flex items-center gap-2.5 hover:bg-red-700 transition-colors cursor-pointer"
      >
        <Upload className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-medium font-['Roboto'] leading-tight">Change Profile Image</span>
      </button>
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault()
          console.log('Remove button clicked')
          onRemoveImage()
        }}
        className="px-3.5 py-2 rounded-md outline-red-600 flex items-center gap-2.5 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4 text-red-600" />
        <span className="text-red-600 text-sm font-medium font-['Roboto'] leading-tight">Remove Profile Image</span>
      </button>
    </div>
  )
}

function ProfileInfo({ name, email }: { name: string; email: string }) {
  return (
    <div className="w-40 flex flex-col gap-1">
      <div className="text-neutral-600 text-lg font-semibold font-['Roboto'] leading-snug">{name}</div>
      <div className="text-zinc-500 text-sm font-normal font-['Roboto'] leading-snug">{email}</div>
    </div>
  )
}

function PersonalInfoSection({
  isEditing,
  onEdit,
  register,
  errors,
  watchedValues,
}: {
  isEditing: boolean
  onEdit: () => void
  register: UseFormRegister<ProfileData>
  errors: FieldErrors<ProfileData>
  watchedValues: ProfileData
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Personal Info" />

      <div className="px-5 py-6 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-start">
        {isEditing ? (
          <PersonalInfoForm register={register} errors={errors} />
        ) : (
          <PersonalInfoDisplay profileData={watchedValues} />
        )}

        {!isEditing && <EditButton onClick={onEdit} />}
      </div>
    </div>
  )
}

function PersonalInfoDisplay({ profileData }: { profileData: ProfileData }) {
  const fields = [
    [
      { label: "First Name", value: profileData.firstName },
      { label: "Last Name", value: profileData.lastName },
    ],
    [
      { label: "Email Address", value: profileData.email },
      { label: "Phone Number", value: profileData.phone },
    ],
    [
      { label: "Address", value: profileData.address },
      { label: "Language", value: profileData.language },
    ],
  ]

  return (
    <div className="w-[636px] flex flex-col gap-6">
      {fields.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-start items-center gap-80">
          {row.map((field, fieldIndex) => (
            <div key={fieldIndex} className="flex items-center gap-3.5">
              <div className="w-40 flex flex-col gap-1">
                <div className="text-zinc-500 text-sm font-normal font-['Roboto'] leading-snug">{field.label}</div>
                <div className="text-neutral-600 text-sm font-medium font-['Roboto']">{field.value}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function PersonalInfoForm({
  register,
  errors,
}: {
  register: UseFormRegister<ProfileData>
  errors: FieldErrors<ProfileData>
}) {
  const formFields = [
    [
      { key: "firstName" as keyof ProfileData, label: "First Name", type: "text" },
      { key: "lastName" as keyof ProfileData, label: "Last Name", type: "text" },
    ],
    [
      { key: "email" as keyof ProfileData, label: "Email Address", type: "email" },
      { key: "phone" as keyof ProfileData, label: "Phone Number", type: "tel" },
    ],
    [
      { key: "address" as keyof ProfileData, label: "Address", type: "text" },
      { key: "language" as keyof ProfileData, label: "Language", type: "select" },
    ],
  ]

  return (
    <div className="flex flex-col gap-6">
      {formFields.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-6">
          {row.map((field, fieldIndex) => (
            <FormField
              key={fieldIndex}
              label={field.label}
              type={field.type}
              fieldKey={field.key}
              register={register}
              errors={errors}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function FormField({
  label,
  type,
  fieldKey,
  register,
  errors,
}: {
  label: string
  type: string
  fieldKey: keyof ProfileData
  register: UseFormRegister<ProfileData>
  errors: FieldErrors<ProfileData>
}) {
  return (
    <div className="w-80 flex flex-col gap-2">
      <label className="text-neutral-600 text-sm font-medium font-['Roboto'] cursor-pointer">{label}</label>
      <div className="h-9 p-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center gap-2.5 relative cursor-pointer">
        {type === "select" ? (
          <>
            <select
              {...register(fieldKey, { required: `${label} is required` })}
              className="flex-1 text-zinc-500 text-sm font-normal font-['Roboto'] leading-snug bg-transparent outline-none appearance-none cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-zinc-500" />
          </>
        ) : (
            <input
              type={type}
              {...register(fieldKey, { 
                required: `${label} is required`,
                ...(type === "email" && {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })
              })}
              className="flex-1 text-zinc-500 text-sm font-normal font-['Roboto'] leading-snug bg-transparent outline-none cursor-text"
            />
        )}
      </div>
      {errors[fieldKey] && (
        <span className="text-red-500 text-xs font-normal font-['Roboto']">
          {errors[fieldKey].message}
        </span>
      )}
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-start items-start gap-20">
      <div className="text-neutral-600 text-lg font-semibold font-['Roboto'] leading-snug">{title}</div>
    </div>
  )
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-2 bg-gray-50 rounded-md outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center gap-2.5 hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <span className="text-neutral-600 text-sm font-medium font-['Roboto'] leading-tight">Edit</span>
      <Edit className="w-5 h-5 text-neutral-600" />
    </button>
  )
}

function ActionButtons({
  onSave,
  onCancel,
}: {
  onSave: () => void
  onCancel: () => void
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onCancel}
        className="w-40 px-4 py-3 bg-slate-950/5 rounded-[10px] flex justify-center items-center hover:bg-slate-950/10 transition-colors cursor-pointer"
      >
        <span className="text-neutral-600 text-lg font-medium font-['Roboto'] leading-normal">Cancel</span>
      </button>
      <button
        onClick={onSave}
        className="px-4 py-3 bg-red-600 rounded-[10px] flex justify-center items-center hover:bg-red-700 transition-colors cursor-pointer"
      >
        <span className="text-white text-lg font-medium font-['Roboto'] leading-normal">Save & Changes</span>
      </button>
    </div>
  )
}
