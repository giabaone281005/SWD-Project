import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-800">Privacy Policy</h2>
      <p className="text-xs text-gray-400 font-bold">Last updated: May 2026</p>

      <div className="space-y-4 text-sm text-gray-500 leading-relaxed font-medium">
        <h3 className="text-lg font-bold text-gray-850 pt-4">1. Information We Collect</h3>
        <p>We collect information you provide directly during registration, including your full name, email address, phone number, and account roles (tenant vs landlord). We also save mock details in local storage for account tracking.</p>

        <h3 className="text-lg font-bold text-gray-850 pt-4">2. How We Use Information</h3>
        <p>Your contact details (email and phone number) are shared with landlords when you submit a viewing booking request, enabling direct communication to coordinate inspections.</p>

        <h3 className="text-lg font-bold text-gray-850 pt-4">3. Data Security</h3>
        <p>We employ encryption methods to secure your authentication requests. We do not store financial payment information or bank passwords on our servers.</p>

        <h3 className="text-lg font-bold text-gray-850 pt-4">4. Third-Party Services</h3>
        <p>Our platform links to third-party maps (like Google Maps API) and storage libraries. These external integrations have their own separate privacy guidelines.</p>
      </div>
    </div>
  );
}
