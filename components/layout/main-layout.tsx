"use client"

import type React from "react"

import { useState } from "react"
import { Bell, ChevronDown, LogOut, Menu, User, X, MessageSquare, Calendar, FileText } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useTheme } from "@/components/theme/theme-provider"
import Sidebar from "./sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

// Dados simulados para notificações
const mockNotifications = [
  {
    id: 1,
    title: "Novo contato adicionado",
    message: "João Silva adicionou um novo contato: Maria Oliveira",
    time: "5 minutos atrás",
    icon: User,
    read: false,
  },
  {
    id: 2,
    title: "Lembrete de reunião",
    message: "Você tem uma reunião com Carlos Mendes às 15:00",
    time: "1 hora atrás",
    icon: Calendar,
    read: false,
  },
  {
    id: 3,
    title: "Relatório mensal disponível",
    message: "O relatório de contatos do mês de Abril está disponível",
    time: "3 horas atrás",
    icon: FileText,
    read: true,
  },
  {
    id: 4,
    title: "Nova mensagem",
    message: "Você recebeu uma nova mensagem de Ana Paula",
    time: "1 dia atrás",
    icon: MessageSquare,
    read: true,
  },
]

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { logout } = useAuth()
  const { theme } = useTheme()

  // Estado para notificações
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleLogout = () => {
    logout()
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar para desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Sidebar para mobile (overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex h-full w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Fechar sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="md:hidden -ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Abrir sidebar</span>
                  <Menu className="h-6 w-6" />
                </button>
                <div className="ml-4 md:ml-0">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">CRM de Contatos</h1>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 relative"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                  </button>

                  {/* Menu de notificações */}
                  {notificationsOpen && (
                    <div className="notification-dropdown">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificações</h3>
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-primary hover:text-primary-dark dark:text-primary-light"
                        >
                          Marcar todas como lidas
                        </button>
                      </div>

                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          Nenhuma notificação
                        </div>
                      ) : (
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`notification-item ${!notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="notification-icon">
                                <notification.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="notification-content">
                                <div className="notification-title">{notification.title}</div>
                                <div className="notification-message">{notification.message}</div>
                                <div className="notification-time">{notification.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="border-t border-gray-100 dark:border-gray-700 p-2">
                        <button
                          className="w-full text-center text-sm text-primary hover:text-primary-dark dark:text-primary-light py-1"
                          onClick={() => setNotificationsOpen(false)}
                        >
                          Ver todas as notificações
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span className="hidden md:flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                      João Silva
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
