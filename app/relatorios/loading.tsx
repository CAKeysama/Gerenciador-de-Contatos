import MainLayout from "@/components/layout/main-layout"

export default function Loading() {
  return (
    <MainLayout>
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    </MainLayout>
  )
}
