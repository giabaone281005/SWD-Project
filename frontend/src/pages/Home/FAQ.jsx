import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'How does the RoomFinder booking process work?',
      a: 'Once you find a room you like, submit a viewing booking request by specifying your preferred date and time. The landlord will receive a notification and can approve, reject, or message you to reschedule. Once approved, you can meet the landlord to view the room.'
    },
    {
      q: 'Are the room addresses and pictures verified?',
      a: 'Yes, we take security seriously. Our moderation team physically inspects boarding houses, coordinates, and photo accuracy to make sure they represent the physical room accurately before marking listings as "Verified".'
    },
    {
      q: 'Do I need to pay any deposit fee on the website?',
      a: 'No. RoomFinder is a room finding platform. All security deposit payments, lease agreements, and monthly rent payments are handled directly between you and the landlord in person. We never ask you to pay deposits online.'
    },
    {
      q: 'How can landlords publish a room post?',
      a: 'Register a Landlord account, access the Landlord Dashboard, and click "Create Room Post". Fill in the title, address, monthly rent, size, photos, and amenities. Your room post will be reviewed by administrators before being published.'
    },
    {
      q: 'What should I do if I find a scam post?',
      a: 'If you encounter inaccurate address details or suspicious requests (like asking for deposits before inspections), use the "Report Post" option or contact support immediately. Our admin team will investigate and suspend fraudulent accounts.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="p-3 bg-primary-50 text-primary-500 rounded-2xl w-fit mx-auto mb-2">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">Frequently Asked Questions</h2>
        <p className="text-sm text-gray-450">Everything you need to know about finding and leasing rooms on our platform</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-gray-800 text-sm md:text-base">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-xs md:text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
