"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import MainLayout from "@/components/layout/main-layout"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dados simulados
const mockData = {
  monthlyContacts: [
    { name: "Jan", value: 12 },
    { name: "Fev", value: 19 },
    { name: "Mar", value: 15 },
    { name: "Abr", value: 25 },
    { name: "Mai", value: 32 },
    { name: "Jun", value: 28 },
    { name: "Jul", value: 35 },
    { name: "Ago", value: 42 },
    { name: "Set", value: 38 },
    { name: "Out", value: 45 },
    { name: "Nov", value: 50 },
    { name: "Dez", value: 56 },
  ],
  categoryDistribution: [
    { name: "Cliente", value: 120 },
    { name: "Fornecedor", value: 45 },
    { name: "Parceiro", value: 65 },
    { name: "Prospect", value: 26 },
  ],
  contactsActivity: [
    { name: "Seg", calls: 4, emails: 7, meetings: 2 },
    { name: "Ter", calls: 6, emails: 9, meetings: 3 },
    { name: "Qua", calls: 5, emails: 12, meetings: 1 },
    { name: "Qui", calls: 8, emails: 10, meetings: 4 },
    { name: "Sex", calls: 7, emails: 8, meetings: 2 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Reports() {
  const [data, setData] = useState(mockData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Crescimento mensal de contatos */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Crescimento Mensal de Contatos</h3>
                <div className="mt-2 h-64">
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
                      <LineChart data={data.monthlyContacts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="value" stroke="var(--color-value)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </div>

            {/* Distribuição por categoria */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Distribuição por Categoria</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}`, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Atividades por dia da semana */}
            <div className="overflow-hidden rounded-lg bg-white shadow lg:col-span-2">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Atividades por Dia da Semana</h3>
                <div className="mt-2 h-64">
                  <ChartContainer
                    config={{
                      calls: {
                        label: "Ligações",
                        color: "hsl(var(--chart-1))",
                      },
                      emails: {
                        label: "E-mails",
                        color: "hsl(var(--chart-2))",
                      },
                      meetings: {
                        label: "Reuniões",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.contactsActivity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="calls" fill="var(--color-calls)" />
                        <Bar dataKey="emails" fill="var(--color-emails)" />
                        <Bar dataKey="meetings" fill="var(--color-meetings)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
