"use client";

import React, { useState } from "react";

interface PaymentRecord {
  id: string;
  user: string;
  method: "BANKAK" | "BINANCE";
  amount: string;
  ref: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const initialPayments: PaymentRecord[] = [
  { id: "PAY-101", user: "user1@example.com", method: "BANKAK", amount: "35,000 SDG", ref: "TXN-8849302", status: "PENDING" },
  { id: "PAY-102", user: "user2@example.com", method: "BINANCE", amount: "10 USDT", ref: "0x39a...e41", status: "PENDING" }
];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);

  const updateStatus = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white dir-rtl p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-yellow-500">لوحة الأدمن - مراجعة التحويلات اليدوية</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-right text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">معرف الطلب</th>
              <th className="p-4">المستخدم</th>
              <th className="p-4">طريقة الدفع</th>
              <th className="p-4">المبلغ</th>
              <th className="p-4">رقم العملية</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-mono">{p.id}</td>
                <td className="p-4">{p.user}</td>
                <td className="p-4 font-bold">{p.method}</td>
                <td className="p-4 text-emerald-400 font-bold">{p.amount}</td>
                <td className="p-4 font-mono text-xs">{p.ref}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    p.status === "APPROVED" ? "bg-emerald-500/20 text-emerald-400" :
                    p.status === "REJECTED" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {p.status === "PENDING" && (
                    <>
                      <button onClick={() => updateStatus(p.id, "APPROVED")} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded font-bold text-xs">
                        تأكيد
                      </button>
                      <button onClick={() => updateStatus(p.id, "REJECTED")} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold text-xs">
                        رفض
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
