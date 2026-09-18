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
    danger: "bg-red-100 text-red-600",
    warning: "bg-amber-100 text-amber-700",
    primary: "bg-slate-100 text-slate-900",
  }

  const buttonClasses = {
    danger: "bg-rose-600 hover:bg-rose-500 focus-visible:ring-rose-500 text-white",
    warning: "bg-amber-600 hover:bg-amber-500 focus-visible:ring-amber-500 text-white",
    primary: "bg-slate-950 hover:bg-slate-800 text-white focus-visible:ring-slate-950",
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
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-slate-200/90">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-lg p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${iconClasses[variant]}`}>
                      <AlertTriangle className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-slate-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-3">
                    <button
                      type="button"
                      disabled={isLoading}
                      className={`inline-flex w-full justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-xs sm:w-auto transition-colors disabled:opacity-50 ${buttonClasses[variant]}`}
                      onClick={handleConfirm}
                    >
                      {isLoading ? "Processing..." : confirmText}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs border border-slate-200 hover:bg-slate-50 sm:mt-0 sm:w-auto transition-colors"
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
