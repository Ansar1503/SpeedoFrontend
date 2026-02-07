export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="16"
              r="15"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 20C12 18.9 12.9 18 14 18C15.1 18 16 18.9 16 20M16 14C15.4 14 15 13.6 15 13C15 12.4 15.4 12 16 12C16.6 12 17 12.4 17 13C17 13.6 16.6 14 16 14M20 18C21.1 18 22 18.9 22 20C22 21.1 21.1 22 20 22C18.9 22 18 21.1 18 20C18 18.9 18.9 18 20 18Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xl font-bold text-gray-900">Speedo</span>
        </div>
      </div>
    </header>
  );
}
