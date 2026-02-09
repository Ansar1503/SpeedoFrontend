export function WelcomeCard() {
  const username = localStorage.getItem("username");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-3xl">👋</span>
        <h2 className="text-2xl font-semibold text-gray-900">Welcome, {username ? username : "User"}</h2>
      </div>
    </div>
  );
}
