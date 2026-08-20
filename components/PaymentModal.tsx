"use client";

import React, { useState } from "react";

export default function PaymentModal({ isOpen, onClose, type = "SUBSCRIPTION" }: { isOpen: boolean; onClose: () => void; type?: "SUBSCRIPTION" | "AD_TOPUP" }) {
  const [method, setMethod] = useState<"BANKAK" | "BINANCE">("BANKAK");
  const [receiptImg, setReceiptImg] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePaySubmit = async () => {
    if (!receiptImg && !transactionRef) {
      alert("يرجى إدخال رابط الصورة أو رقم العملية لتأكيد التحويل.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/bankak-pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        userId: "user-id-placeholder", 
        type, 
        method,
        receiptImg, 
        transactionRef 
      })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      alert(data.message || "تم إرسال طلبك بنجاح، سيتم مراجعته قريباً.");
      onClose();
    } else {
      alert(data.error || "حدث خطأ أثناء الإرسال.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 dir-rtl text-white">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold text-yellow-500 text-center">اختر طريقة الدفع المناسبة</h2>
        
        <div className="flex space-x-2 space-x-reverse border-b border-slate-800 pb-3">
          <button 
            onClick={() => setMethod("BANKAK")}
            className={`flex-1 py-2 rounded-lg font-bold transition text-sm ${method === "BANKAK" ? "bg-yellow-500 text-black" : "bg-slate-800 text-slate-300"}`}
          >
            بنكك (Bankak)
          </button>
          <button 
            onClick={() => setMethod("BINANCE")}
            className={`flex-1 py-2 rounded-lg font-bold transition text-sm ${method === "BINANCE" ? "bg-yellow-500 text-black" : "bg-slate-800 text-slate-300"}`}
          >
            Binance (USDT)
          </button>
        </div>

        {method === "BANKAK" && (
          <div className="space-y-3 text-sm">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <p className="text-slate-400">رقم الحساب: <span className="text-white font-mono font-bold select-all">9412190</span></p>
              <p className="text-slate-400">اسم الحساب: <span className="text-white font-bold">يوسف إبراهيم الطيب عبدالقادر</span></p>
              <p className="text-slate-400">المبلغ: <span className="text-emerald-400 font-bold">35,000 جنيه سوداني</span></p>
              <p className="text-xs text-yellow-400 mt-2 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                ⚠️ اكتب اسم الموقع <strong className="underline">Videxa AI</strong> في ملاحظات التحويل.
              </p>
            </div>
          </div>
        )}

        {method === "BINANCE" && (
          <div className="space-y-3 text-sm">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <p className="text-slate-400">الشبكة: <span className="text-yellow-500 font-bold">TRC20 (Tron)</span></p>
              <p className="text-slate-400">عنوان المحفظة:</p>
              <p className="text-xs font-mono bg-slate-900 p-2 rounded text-emerald-400 break-all select-all border border-slate-800">
                TGaAcY8fQ3xwY4JsEJtSfon5efz4bPhJg2
              </p>
              <p className="text-slate-400">المبلغ المطلـوب: <span className="text-emerald-400 font-bold">10 USDT</span></p>
            </div>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <div>
            <label className="block text-xs mb-1 text-slate-300">رقم العملية / Transaction Hash (اختياري)</label>
            <input 
              type="text" 
              placeholder="أدخل رقم العملية..." 
              value={transactionRef} 
              onChange={(e) => setTransactionRef(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-slate-300">رابط صورة إشعار التحويل</label>
            <input 
              type="text" 
              placeholder="https://..." 
              value={receiptImg} 
              onChange={(e) => setReceiptImg(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>

          <button 
            onClick={handlePaySubmit}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-bold transition text-white mt-2"
          >
            {loading ? "جاري الإرسال..." : "تأكيد وإرسال الإشعار"}
          </button>
        </div>

        <button onClick={onClose} className="w-full bg-slate-800 text-slate-400 py-2 rounded-xl text-sm">
          إلغاء
        </button>
      </div>
    </div>
  );
}
