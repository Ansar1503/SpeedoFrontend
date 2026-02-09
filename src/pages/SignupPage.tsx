import SignupForm from "@/components/SignupForm";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8e6d4] via-[#7fd9c7] to-[#5bcec4] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-12">
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
        <SignupForm />
        {/* Toggle Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-[#5bcec4] font-semibold hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
