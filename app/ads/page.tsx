"use client";

import React, { useState } from "react";
import PaymentModal from "@/components/PaymentModal";

export default function AdsDashboard() {
  const [isPayOpen, setIsPayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white dir-rtl p-6 max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">لوحة تحكم المعلنين (Videxa Ads)</h1>
          <p className="text-xs text-slate-400">إدارة الحملات الإعلانية ومتابعة الميزانية اليومية</p>
        </div>
        <button 
          onClick={() => setIsPayOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition"
        >
          + شحن رصيد الإعلانات
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs text-slate-400">الرصيد المتاح</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">$0.00 USDT</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs text-slate-400">إجمالي الظهور (Views)</p>
          <p className="text-2xl font-bold text-yellow-500 mt-1">0</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs text-slate-400">إجمالي النقرات (Clicks)</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">0</p>
        </div>
      </div>

      {/* Campaign Notice */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
        <h3 className="font-bold text-slate-200">لا توجد حملات إعلانية نشطة</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          قم بشحن محفظتك بمبلغ 20 USDT على الأقل لتتمكن من إنشاء إعلانك الأول داخل شاشة Discover أو البانر العلوي.
        </p>
        <button onClick={() => setIsPayOpen(true)} className="bg-yellow-500 text-black font-bold px-6 py-2.5 rounded-xl text-sm">
          اشحن الآن
        </button>
      </div>

      <PaymentModal isOpen={isPayOpen} onClose={() => setIsPayOpen(false)} type="AD_TOPUP" />
    </div>
  );
}

