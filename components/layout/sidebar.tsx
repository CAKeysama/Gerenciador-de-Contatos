"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Contact, Home, Settings, Users } from "lucide-react"
import { useTheme } from "@/components/theme/theme-provider"

export default function Sidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Contatos", href: "/contatos", icon: Users },
    { name: "Relatórios", href: "/relatorios", icon: BarChart2 },
    { name: "Configurações", href: "/configuracoes", icon: Settings },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-shrink-0 items-center px-4 py-5">
        <Contact className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-semibold dark:text-white">ContactCRM</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-opacity-10 text-primary dark:text-primary-light"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                style={isActive ? { backgroundColor: "rgba(var(--primary-rgb), 0.1)" } : {}}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive
                      ? "text-primary dark:text-primary-light"
                      : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
