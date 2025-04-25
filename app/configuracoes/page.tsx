"use client"

import type React from "react"

import { useState, useRef } from "react"
import { CheckCircle, User, Moon, Sun, Bell, Database, Globe, Upload, Save, X } from "lucide-react"
import MainLayout from "@/components/layout/main-layout"
import { useAuth } from "@/components/auth/auth-provider"
import { useTheme } from "@/components/theme/theme-provider"

// Tipos
type TabType = "perfil" | "aparencia" | "notificacoes" | "contatos" | "sistema"

interface CategoryItem {
  id: string
  name: string
  color: string
}

export default function Settings() {
  const { logout } = useAuth()
  const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme()
  const [activeTab, setActiveTab] = useState<TabType>("perfil")
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Configurações de perfil
  const [profileSettings, setProfileSettings] = useState({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatar: "/avatar-default.png",
  })

  // Configurações de notificações
  const [notificationsSettings, setNotificationsSettings] = useState({
    emailNotifications: true,
    newContactNotification: true,
    reminderNotification: true,
    marketingEmails: false,
    smsNotifications: false,
  })

  // Configurações de contatos
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: "1", name: "Cliente", color: "#4f46e5" },
    { id: "2", name: "Fornecedor", color: "#0891b2" },
    { id: "3", name: "Parceiro", color: "#16a34a" },
    { id: "4", name: "Prospect", color: "#f59e0b" },
  ])
  const [newCategory, setNewCategory] = useState({ name: "", color: "#4f46e5" })
  const [showCustomFields, setShowCustomFields] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)

  // Configurações de sistema
  const [language, setLanguage] = useState("pt-BR")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [timezone, setTimezone] = useState("America/Sao_Paulo")

  // Estados para checkboxes de segurança
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(false)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationsSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileSettings((prev) => ({ ...prev, avatar: e.target!.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      setCategories([...categories, { id: Date.now().toString(), ...newCategory }])
      setNewCategory({ name: "", color: "#4f46e5" })
    }
  }

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleSaveSettings = (section: string) => {
    // Simulação de salvamento
    setTimeout(() => {
      setSuccessMessage(`Configurações de ${section} salvas com sucesso!`)
      setShowSuccess(true)

      // Esconder mensagem após 3 segundos
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 500)
  }

  const handleExportContacts = () => {
    // Simulação de exportação
    setTimeout(() => {
      setSuccessMessage("Contatos exportados com sucesso!")
      setShowSuccess(true)

      // Esconder mensagem após 3 segundos
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 500)
  }

  const handleImportContacts = () => {
    // Simulação de importação
    setTimeout(() => {
      setSuccessMessage("Contatos importados com sucesso!")
      setShowSuccess(true)

      // Esconder mensagem após 3 segundos
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 500)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "perfil":
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
              <div className="relative mb-4 sm:mb-0">
                <div
                  className="h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
                  onClick={handleAvatarClick}
                >
                  <img
                    src={profileSettings.avatar || "/avatar-default.png"}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/avatar-default.png"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
              <div className="w-full space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileSettings.name}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileSettings.email}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profileSettings.phone}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Alterar senha</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Senha atual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={profileSettings.currentPassword}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nova senha
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={profileSettings.newPassword}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirmar nova senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={profileSettings.confirmPassword}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSettings("perfil")}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar alterações
              </button>
            </div>
          </div>
        )

      case "aparencia":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tema</h3>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`flex items-center space-x-2 rounded-md px-4 py-2 ${
                    theme === "light"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  <Sun className="h-5 w-5" />
                  <span>Claro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`flex items-center space-x-2 rounded-md px-4 py-2 ${
                    theme === "dark"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  <Moon className="h-5 w-5" />
                  <span>Escuro</span>
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cor primária</h3>
              <div className="mt-4 grid grid-cols-5 gap-4">
                {[
                  { name: "Indigo", value: "#4f46e5" },
                  { name: "Azul", value: "#2563eb" },
                  { name: "Verde", value: "#16a34a" },
                  { name: "Vermelho", value: "#dc2626" },
                  { name: "Roxo", value: "#9333ea" },
                ].map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setPrimaryColor(color.value)}
                    className={`flex h-12 w-full items-center justify-center rounded-md ${
                      primaryColor === color.value ? "ring-2 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {primaryColor === color.value && <CheckCircle className="h-6 w-6 text-white" />}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cor atual:{" "}
                  <span className="font-medium" style={{ color: primaryColor }}>
                    {primaryColor}
                  </span>
                </p>
                <div className="mt-2">
                  <label htmlFor="customColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cor personalizada
                  </label>
                  <div className="mt-1 flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="color"
                        id="customColor"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-12 w-12 cursor-pointer rounded-md border-2 border-gray-300 p-0 dark:border-gray-600"
                      />
                      <div
                        className="absolute inset-0 rounded-md pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)" }}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="#RRGGBB"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Visualização</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-md bg-primary p-4 text-white">
                  <p className="font-medium">Este é um exemplo da cor primária</p>
                  <p className="text-sm opacity-80">
                    Você pode ver como a cor primária aparece nos elementos da interface.
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="rounded-md bg-primary px-4 py-2 text-white">Botão primário</button>
                  <button className="rounded-md border border-primary bg-transparent px-4 py-2 text-primary dark:text-primary-light">
                    Botão secundário
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSettings("aparência")}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar alterações
              </button>
            </div>
          </div>
        )

      case "notificacoes":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notificações por e-mail</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={notificationsSettings.emailNotifications}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Ativar notificações por e-mail
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Receba atualizações importantes por e-mail.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="newContactNotification"
                      name="newContactNotification"
                      type="checkbox"
                      checked={notificationsSettings.newContactNotification}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newContactNotification" className="font-medium text-gray-700 dark:text-gray-300">
                      Novos contatos
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receba notificações quando novos contatos forem adicionados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="reminderNotification"
                      name="reminderNotification"
                      type="checkbox"
                      checked={notificationsSettings.reminderNotification}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="reminderNotification" className="font-medium text-gray-700 dark:text-gray-300">
                      Lembretes
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Receba lembretes sobre tarefas e compromissos.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="marketingEmails"
                      name="marketingEmails"
                      type="checkbox"
                      checked={notificationsSettings.marketingEmails}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketingEmails" className="font-medium text-gray-700 dark:text-gray-300">
                      E-mails de marketing
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Receba novidades, dicas e ofertas especiais.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Outras notificações</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="smsNotifications"
                      name="smsNotifications"
                      type="checkbox"
                      checked={notificationsSettings.smsNotifications}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="smsNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Notificações por SMS
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Receba alertas importantes por SMS.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSettings("notificações")}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar alterações
              </button>
            </div>
          </div>
        )

      case "contatos":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Categorias de contatos</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Gerencie as categorias disponíveis para classificar seus contatos.
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center rounded-full px-3 py-1 text-sm"
                      style={{ backgroundColor: category.color, color: "white" }}
                    >
                      <span>{category.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category.id)}
                        className="ml-2 rounded-full p-0.5 hover:bg-white hover:bg-opacity-20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                  <div className="sm:col-span-7">
                    <label
                      htmlFor="newCategoryName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Nova categoria
                    </label>
                    <input
                      type="text"
                      id="newCategoryName"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Nome da categoria"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="newCategoryColor"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Cor
                    </label>
                    <div className="mt-1">
                      <input
                        type="color"
                        id="newCategoryColor"
                        value={newCategory.color}
                        onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                        className="h-12 w-12 cursor-pointer rounded-md border-2 border-gray-300 p-0 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-end sm:col-span-3">
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="h-12 w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Campos personalizados</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="showCustomFields"
                      type="checkbox"
                      checked={showCustomFields}
                      onChange={(e) => setShowCustomFields(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="showCustomFields" className="font-medium text-gray-700 dark:text-gray-300">
                      Mostrar campos personalizados
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Exibir campos personalizados nos formulários de contato.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Importação e exportação</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleImportContacts}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Importar contatos (CSV)
                </button>
                <button
                  type="button"
                  onClick={handleExportContacts}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Exportar contatos (CSV)
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Backup automático</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="autoBackup"
                      type="checkbox"
                      checked={autoBackup}
                      onChange={(e) => setAutoBackup(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="autoBackup" className="font-medium text-gray-700 dark:text-gray-300">
                      Backup automático
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Realizar backup automático dos contatos semanalmente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSettings("contatos")}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar alterações
              </button>
            </div>
          </div>
        )

      case "sistema":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Idioma e região</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Idioma
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (United States)</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Formato de data
                  </label>
                  <select
                    id="dateFormat"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fuso horário
                  </label>
                  <select
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                    <option value="Europe/Paris">Paris (GMT+1)</option>
                    <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Segurança</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="twoFactorAuth"
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="twoFactorAuth" className="font-medium text-gray-700 dark:text-gray-300">
                      Autenticação de dois fatores
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Aumenta a segurança da sua conta exigindo uma segunda forma de verificação.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="sessionTimeout"
                      type="checkbox"
                      checked={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sessionTimeout" className="font-medium text-gray-700 dark:text-gray-300">
                      Timeout de sessão
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Encerrar sessão automaticamente após 30 minutos de inatividade.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dados e privacidade</h3>
              <div className="mt-4 space-y-4">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Baixar meus dados
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600"
                >
                  Excluir minha conta
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSettings("sistema")}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar alterações
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h1>
        </div>

        <div className="overflow-hidden bg-white shadow sm:rounded-lg dark:bg-gray-800">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto px-4 sm:px-6">
              {[
                { id: "perfil", name: "Perfil", icon: User },
                { id: "aparencia", name: "Aparência", icon: theme === "dark" ? Moon : Sun },
                { id: "notificacoes", name: "Notificações", icon: Bell },
                { id: "contatos", name: "Contatos", icon: Database },
                { id: "sistema", name: "Sistema", icon: Globe },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-primary text-primary dark:text-primary-light"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="px-4 py-5 sm:p-6">{renderTabContent()}</div>
        </div>

        {/* Mensagem de sucesso */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 z-50 rounded-md bg-green-50 p-4 shadow-lg dark:bg-green-900">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400 dark:text-green-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
