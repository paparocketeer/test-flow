import React from 'react'

interface FilterSidebarProps {
  className?: string
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ className }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        {/* Call Duration Filters */}
        <div className="flex items-center gap-3 px-5 py-2 bg-white rounded shadow-sm">
          <span className="text-sm font-medium text-gray-900">Длина звонка больше, мин</span>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm">
            <option>00:00</option>
          </select>
        </div>

        <div className="flex items-center gap-3 px-5 py-2 bg-white rounded shadow-sm">
          <span className="text-sm font-medium text-gray-900">Длина звонка меньше, мин</span>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm">
            <option>00:00</option>
          </select>
        </div>

        {/* Date Filters */}
        <div className="flex items-center gap-3 px-5 py-2 bg-white rounded shadow-sm">
          <span className="text-sm font-medium text-gray-900">Дата диалога от</span>
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm">
            <span>01.01.2025</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-2 bg-white rounded shadow-sm">
          <span className="text-sm font-medium text-gray-900">Дата диалога до</span>
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm">
            <span>01.01.2025</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Marker Filter */}
        <div className="flex items-center gap-3 px-5 py-2 bg-white rounded shadow-sm">
          <span className="text-sm font-medium text-gray-900">Маркер</span>
          <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm">
            <option>Выберите тип</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar 