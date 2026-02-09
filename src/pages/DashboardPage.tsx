import { DashboardHeader } from "@/components/layouts/Header";
import { WelcomeCard } from "@/components/WelcomeCard";
import { TripsSection } from "@/components/TripSection";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <WelcomeCard />
        <TripsSection />
      </main>
    </div>
  );
}
