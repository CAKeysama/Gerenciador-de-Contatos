"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import MainLayout from "@/components/layout/main-layout"

// Tipos
interface ContactFormData {
  name: string
  email: string
  phone: string
  category: string
  notes: string
  avatar: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  category?: string
}

export default function ContactForm() {
  const params = useParams()
  const router = useRouter()
  const isEditing = params.id !== "novo"
  const contactId = isEditing ? params.id : null

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    category: "",
    notes: "",
    avatar: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isEditing) {
      // Simulação de carregamento de dados do contato
      const timer = setTimeout(() => {
        setFormData({
          name: `Contato ${contactId}`,
          email: `contato${contactId}@exemplo.com`,
          phone: `(11) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
          category: ["Cliente", "Fornecedor", "Parceiro", "Prospect"][Math.floor(Math.random() * 4)],
          notes: "Observações sobre o contato...",
          avatar:
            Number(contactId) % 5 === 0
              ? ""
              : `https://randomuser.me/api/portraits/${Number(contactId) % 2 === 0 ? "men" : "women"}/${(Number(contactId) % 70) + 1}.jpg`,
        })
        setLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [contactId, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando o usuário digita
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Limpar mensagens anteriores
    setSuccess(false)
    setError("")

    // Validar formulário
    if (!validate()) {
      return
    }

    try {
      setSaving(true)

      // Simulação de salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)

      // Redirecionar após salvar
      setTimeout(() => {
        router.push("/contatos")
      }, 2000)
    } catch (err) {
      setError("Ocorreu um erro ao salvar o contato. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? "Editar Contato" : "Novo Contato"}</h1>
        </div>

        {formData.avatar && (
          <div className="mt-4 flex justify-center sm:justify-start">
            <div className="h-24 w-24 overflow-hidden rounded-full">
              <img
                src={formData.avatar || "/avatar-placeholder.png"}
                alt="Avatar do contato"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/avatar-placeholder.png"
                }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome completo *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm ${
                          errors.name
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-mail *
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm ${
                          errors.email
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Telefone *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm ${
                          errors.phone
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      />
                      {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Categoria *
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`block w-full rounded-md shadow-sm sm:text-sm ${
                          errors.category
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      >
                        <option value="">Selecione uma categoria</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Fornecedor">Fornecedor</option>
                        <option value="Parceiro">Parceiro</option>
                        <option value="Prospect">Prospect</option>
                      </select>
                      {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Anotações
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensagens de sucesso/erro */}
              {success && (
                <div className="rounded-md bg-green-50 p-4 m-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">Contato salvo com sucesso!</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-md bg-red-50 p-4 m-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botões de ação */}
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => router.push("/contatos")}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
