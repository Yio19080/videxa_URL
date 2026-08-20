import React from "react";

export const metadata = {
  title: "Videxa AI",
  description: "منصة الذكاء الاصطناعي والإعلانات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-950 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

