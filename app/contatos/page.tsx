"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Edit, Plus, Search, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import MainLayout from "@/components/layout/main-layout"
import ContactDetailModal from "@/components/contacts/contact-detail-modal"

// Tipos
interface Contact {
  id: number
  name: string
  email: string
  phone: string
  category: string
  avatar: string
  notes?: string
}

// Dados simulados
const mockContacts: Contact[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Contato ${i + 1}`,
  email: `contato${i + 1}@exemplo.com`,
  phone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
  category: ["Cliente", "Fornecedor", "Parceiro", "Prospect"][Math.floor(Math.random() * 4)],
  avatar: i % 5 === 0 ? "" : `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${(i % 70) + 1}.jpg`,
  notes:
    i % 3 === 0
      ? `Anotações sobre o contato ${i + 1}. Este é um cliente importante que devemos manter contato regular.`
      : undefined,
}))

export default function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setContacts(mockContacts)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filtrar contatos
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)

    const matchesCategory = selectedCategory === "" || contact.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)

  // Função para gerar array de páginas a exibir
  const getPageNumbers = () => {
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  // Categorias únicas para o filtro
  const categories = ["Cliente", "Fornecedor", "Parceiro", "Prospect"]

  // Manipular exclusão
  const handleDeleteClick = (contact: Contact) => {
    setContactToDelete(contact)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (contactToDelete) {
      setContacts(contacts.filter((c) => c.id !== contactToDelete.id))
      setShowDeleteModal(false)
      setContactToDelete(null)
    }
  }

  // Manipular visualização de detalhes
  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contatos</h1>
          <Link
            href="/contatos/novo"
            className="mt-3 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0"
          >
            <Plus className="-ml-1 mr-2 h-4 w-4" />
            Novo Contato
          </Link>
        </div>

        {/* Filtros e Pesquisa */}
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
          <div className="w-full md:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Pesquisar
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pl-12 pr-4 py-3 focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Pesquisar contatos..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div>

          <div>
            <select
              id="category"
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela de Contatos */}
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg dark:ring-gray-700">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 md:table-cell"
                >
                  E-mail
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 lg:table-cell"
                >
                  Telefone
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                >
                  Categoria
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Nenhum contato encontrado
                  </td>
                </tr>
              ) : (
                currentItems.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={contact.avatar || "/avatar-default.png"}
                            alt=""
                            onError={(e) => {
                              e.currentTarget.src = "/avatar-default.png"
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => handleViewDetails(contact)}
                            className="font-medium text-primary hover:text-primary-dark hover:underline dark:text-primary-light"
                          >
                            {contact.name}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 md:table-cell">
                      {contact.email}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 lg:table-cell">
                      {contact.phone}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex rounded-full bg-indigo-100 px-2 text-xs font-semibold leading-5 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {contact.category}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(contact)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title="Ver detalhes"
                        >
                          <Eye className="h-5 w-5" />
                          <span className="sr-only">Ver detalhes de {contact.name}</span>
                        </button>
                        <Link
                          href={`/contatos/${contact.id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Editar"
                        >
                          <Edit className="h-5 w-5" />
                          <span className="sr-only">Editar {contact.name}</span>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(contact)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Excluir"
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Excluir {contact.name}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {!loading && filteredContacts.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{" "}
                  <span className="font-medium">{Math.min(indexOfLastItem, filteredContacts.length)}</span> de{" "}
                  <span className="font-medium">{filteredContacts.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="pagination-arrow rounded-l-md"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`pagination-item ${page === currentPage ? "active" : ""}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-arrow rounded-r-md"
                    aria-label="Próxima página"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle dark:bg-gray-800">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 dark:bg-red-900">
                      <Trash2 className="h-6 w-6 text-red-600 dark:text-red-200" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Excluir contato</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Tem certeza que deseja excluir o contato {contactToDelete?.name}? Esta ação não pode ser
                          desfeita.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={confirmDelete}
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de detalhes do contato */}
        {selectedContact && <ContactDetailModal contact={selectedContact} onClose={() => setSelectedContact(null)} />}
      </div>
    </MainLayout>
  )
}
