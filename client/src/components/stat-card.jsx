export function StatCard({ title, value, subtitle, icon: Icon, variant = 'default' }) {
  const variants = {
    default: 'bg-white border-gray-100',
    success: 'bg-emerald-50 border-emerald-100',
    warning: 'bg-amber-50 border-amber-100',
    info: 'bg-blue-50 border-blue-100',
  }

  const iconVariants = {
    default: 'bg-gray-100 text-gray-600',
    success: 'bg-emerald-100 text-emerald-600',
    warning: 'bg-amber-100 text-amber-600',
    info: 'bg-blue-100 text-blue-600',
  }

  return (
    <div className={`rounded-xl border p-6 shadow-sm transition-all hover:shadow-md ${variants[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`rounded-lg p-3 ${iconVariants[variant]}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  )
}
