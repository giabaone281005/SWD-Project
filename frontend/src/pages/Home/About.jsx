import React from 'react';
import { Target, Users, Landmark } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">About RoomFinder</h2>
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
          We are dedicated to building Ho Chi Minh City's most trustworthy and secure room finding platform for students and working professionals.
        </p>
      </div>

      {/* Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
          <div className="p-3.5 bg-primary-50 text-primary-500 rounded-2xl w-fit mx-auto">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Our Mission</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            To eliminate rental scams and misleading ads by vetting all listed addresses and establishing direct, transparent communication channels.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-2xl w-fit mx-auto">
            <Landmark className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Direct Leasing</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            We bypass middlemen and brokers. Tenants rent directly from landlords, ensuring absolute clarity in pricing and agreements.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
          <div className="p-3.5 bg-amber-50 text-amber-500 rounded-2xl w-fit mx-auto">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Community Vetted</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Leveraging user reviews and safety flags, our platform dynamically updates and purges outdated listings to maintain reliability.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-gray-50 border border-gray-150 p-8 rounded-[40px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold text-gray-850">Our Story</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Finding a clean, secure boarding room in a massive city like HCMC can be incredibly frustrating. Students often face fake coordinates, unapproved pricing, and uncooperative terms.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            RoomFinder was founded in 2026 to resolve these pain points. We built a system focused on absolute address mapping, real-time messaging, and unified landlord tools to streamline the process.
          </p>
        </div>
        <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="Team work"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
