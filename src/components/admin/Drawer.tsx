"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
  width?: "md" | "lg" | "xl"
}

const widthClasses = {
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
}

export function Drawer({ open, onClose, title, subtitle, children, width = "lg" }: DrawerProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={`pointer-events-auto w-screen ${widthClasses[width]}`}>
                  <div className="flex h-full flex-col bg-white dark:bg-zinc-950 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
                      <div>
                        {title && (
                          <Dialog.Title className="text-base font-semibold text-gray-900 dark:text-white">
                            {title}
                          </Dialog.Title>
                        )}
                        {subtitle && (
                          <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="relative flex-1 overflow-y-auto px-6 py-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
