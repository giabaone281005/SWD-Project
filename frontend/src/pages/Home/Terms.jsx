import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-800">Terms of Service</h2>
      <p className="text-xs text-gray-400 font-bold">Last updated: May 2026</p>
      
      <div className="space-y-4 text-sm text-gray-500 leading-relaxed font-medium">
        <h3 className="text-lg font-bold text-gray-850 pt-4">1. Acceptance of Terms</h3>
        <p>By accessing or using the RoomFinder Platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not access or use our services.</p>

        <h3 className="text-lg font-bold text-gray-850 pt-4">2. Platform Role</h3>
        <p>RoomFinder is an online listing marketplace. We do not own, manage, or contract any boarding houses or apartments directly. All leasing agreements, deposits, and physical room conditions are strictly the responsibility of the respective landlord and tenant.</p>

        <h3 className="text-lg font-bold text-gray-850 pt-4">3. User Conduct and Moderation</h3>
        <p>Landlords are required to upload accurate address coords, photos, and true pricing parameters. Submission of false listings, fraudulent requests, or attempts to extract booking fees online will result in immediate suspension and banning of the account.</p>

        <h3 className="text-lg font-bold text-gray-850 pt-4">4. Limitation of Liability</h3>
        <p>RoomFinder is not liable for any disputes, damages, financial losses, or physical conflicts arising from leasing agreements or landlord-tenant interactions. Users are highly advised to inspect rooms physically before transferring security deposits.</p>
      </div>
    </div>
  );
}
