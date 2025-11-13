export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#fefbf9] py-8 px-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-[#5a5a5a] mb-4">
          Thank you!
        </h1>
        <p className="text-2xl text-[#8a8a8a] mb-12">
          Love Mail Updated
        </p>

        {/* Mailbox Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Mailbox Body */}
            <div className="w-48 h-48 bg-white border-4 border-[#5a5a5a] rounded-lg relative">
              {/* Mailbox Door */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-white border-t-4 border-[#5a5a5a] rounded-b-lg">
                {/* Heart on mailbox */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#ef4444">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                {/* Mail slot */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-[#5a5a5a] rounded"></div>
              </div>
            </div>
            
            {/* Mailbox Flag */}
            <div className="absolute -right-8 top-8 w-16 h-2 bg-[#5a5a5a] transform rotate-45 origin-left">
              <div className="absolute -right-2 -top-1 w-4 h-4 bg-[#5a5a5a] rounded-full"></div>
            </div>
            
            {/* "YOU MAIL" text on flag */}
            <div className="absolute -right-12 top-4 transform rotate-45 text-xs font-bold text-[#5a5a5a] whitespace-nowrap">
              YOU MAIL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

