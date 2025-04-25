"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Calendar, Plus, Users } from "lucide-react"
import MainLayout from "@/components/layout/main-layout"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dados simulados
const mockData = {
  totalContacts: 256,
  recentContacts: 12,
  categories: [
    { name: "Cliente", count: 120 },
    { name: "Fornecedor", count: 45 },
    { name: "Parceiro", count: 65 },
    { name: "Prospect", count: 26 },
  ],
  recentContactsList: [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@email.com",
      category: "Cliente",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Carlos Oliveira",
      email: "carlos@empresa.com",
      category: "Fornecedor",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Mariana Costa",
      email: "mariana.costa@parceiro.com",
      category: "Parceiro",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
}

export default function Dashboard() {
  const [data, setData] = useState(mockData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const chartData = data.categories.map((category) => ({
    name: category.name,
    value: category.count,
  }))

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total de Contatos</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{loading ? "..." : data.totalContacts}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Contatos Recentes</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{loading ? "..." : data.recentContacts}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Categorias</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {loading ? "..." : data.categories.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico e Contatos Recentes */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Gráfico */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Distribuição por Categoria</h3>
              <div className="mt-2 h-64">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <ChartContainer
                    config={{
                      value: {
                        label: "Contatos",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="var(--color-value)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
              </div>
            </div>
          </div>

          {/* Contatos Recentes */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Contatos Recentes</h3>
              <div className="mt-2 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {loading ? (
                    <div className="flex h-64 items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
                    </div>
                  ) : (
                    data.recentContactsList.map((contact) => (
                      <li key={contact.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img className="h-8 w-8 rounded-full" src={contact.avatar || "/placeholder.svg"} alt="" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">{contact.name}</p>
                            <p className="truncate text-sm text-gray-500">{contact.email}</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                              {contact.category}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href="/contatos"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-gray-50"
                >
                  Ver todos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
