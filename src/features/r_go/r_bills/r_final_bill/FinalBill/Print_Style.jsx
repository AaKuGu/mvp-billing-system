"use client";

import React from "react";

const Print_Style = () => {
  return (
    <style jsx global>{`
      @media print {
        @page {
          size: A4 portrait; /* ✅ A4 sheet, auto height */
          margin: 6mm 6mm; /* ✅ Nice even margins on all sides */
        }

        /* Hide everything except printable area */
        body * {
          visibility: hidden;
          font-size: 11pt;
          line-height: 1.4;
        }

        #printable-area,
        #printable-area * {
          visibility: visible;
        }

        #printable-area {
          position: relative;
          width: 100%;
          max-width: 190mm; /* ✅ Prevent text from touching edges */
          margin: 0 auto;
          background: white;
          padding: 10mm 12mm; /* ✅ Clean inner padding */
          box-shadow: none !important;
          border: none !important;
        }

        /* Optional: Hide buttons and UI controls */
        button,
        .no-print {
          display: none !important;
        }

        /* Optional: Enhance table readability */
        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 4px 6px;
          border-bottom: 1px solid #ddd;
        }

        th {
          font-weight: bold;
          background: #f9f9f9;
        }

        /* Make headings stand out */
        h1,
        h2,
        h3,
        h4 {
          margin: 0 0 8px 0;
          font-weight: 600;
        }
      }
    `}</style>
  );
};

export default Print_Style;
