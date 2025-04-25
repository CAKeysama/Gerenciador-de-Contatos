"use client"

import { useState } from "react"
import { Mail, Phone, Tag, X, Edit, MessageCircle, Copy } from "lucide-react"
import Link from "next/link"

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  category: string
  avatar: string
  notes?: string
}

interface ContactDetailModalProps {
  contact: Contact | null
  onClose: () => void
}

export default function ContactDetailModal({ contact, onClose }: ContactDetailModalProps) {
  const [copied, setCopied] = useState<string | null>(null)

  if (!contact) return null

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const getWhatsAppLink = (phone: string) => {
    // Remover caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, "")
    return `https://wa.me/${cleanPhone}`
  }

  const getMailtoLink = (email: string) => {
    return `mailto:${email}`
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle dark:bg-gray-800">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
              onClick={onClose}
            >
              <span className="sr-only">Fechar</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-32 sm:w-32">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={contact.avatar || "/avatar-placeholder.png"}
                  alt={contact.name}
                  onError={(e) => {
                    e.currentTarget.src = "/avatar-placeholder.png"
                  }}
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-2xl font-bold leading-6 text-gray-900 mt-2 dark:text-white">{contact.name}</h3>
                <div className="mt-2">
                  <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {contact.category}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{contact.email}</span>
                    <button
                      className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={() => copyToClipboard(contact.email, "email")}
                      title="Copiar e-mail"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    {copied === "email" && (
                      <span className="ml-2 text-xs text-green-600 dark:text-green-400">Copiado!</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{contact.phone}</span>
                    <button
                      className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={() => copyToClipboard(contact.phone, "phone")}
                      title="Copiar telefone"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    {copied === "phone" && (
                      <span className="ml-2 text-xs text-green-600 dark:text-green-400">Copiado!</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{contact.category}</span>
                  </div>
                </div>

                {contact.notes && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Anotações</h4>
                    <div className="mt-1 rounded-md bg-gray-50 p-3 dark:bg-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-300">{contact.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Ações rápidas</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              <a
                href={getWhatsAppLink(contact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={getMailtoLink(contact.email)}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Mail className="mr-2 h-4 w-4" />
                E-mail
              </a>
              <Link
                href={`/contatos/${contact.id}`}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Link>
              <button
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={onClose}
              >
                <X className="mr-2 h-4 w-4" />
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
