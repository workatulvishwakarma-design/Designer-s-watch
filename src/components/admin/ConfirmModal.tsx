"use client"

import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { AlertTriangle, X } from "lucide-react"
import { toast } from "sonner"

interface ConfirmModalProps {
  title: string
  description: string
  onConfirm: () => Promise<void> | void
  triggerButton: React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "primary"
}

export function ConfirmModal({
  title,
  description,
  onConfirm,
  triggerButton,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      setIsOpen(false)
    } catch (e) {
      toast.error("An error occurred during confirmation.")
    } finally {
      setIsLoading(false)
    }
  }

  const iconClasses = {
    danger: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-500",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-500",
    primary: "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-gray-100",
  }

  const buttonClasses = {
    danger: "bg-red-600 hover:bg-red-500 focus-visible:ring-red-500 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-500 focus-visible:ring-yellow-500 text-white",
    primary: "bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white focus-visible:ring-black",
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block">
        {triggerButton}
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white dark:bg-zinc-950 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-gray-100 dark:border-zinc-800">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${iconClasses[variant]}`}>
                      <AlertTriangle className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-3">
                    <button
                      type="button"
                      disabled={isLoading}
                      className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 ${buttonClasses[variant]}`}
                      onClick={handleConfirm}
                    >
                      {isLoading ? "Processing..." : confirmText}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-zinc-900 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 sm:mt-0 sm:w-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      {cancelText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
