// ✅ Calculate grand total

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const calculateGrandTotal = (billingItems) => {
  const grandTotal = billingItems?.reduce((acc, item) => {
    const totalPrice = Number(item?.itemDetails?.totalPrice) || 0;
    return acc + totalPrice;
  }, 0);
  return grandTotal;
};

export const generateCleanPdf = async () => {
  const billElement = document.getElementById("bill-printable");
  if (!billElement) return;

  // Render DOM to canvas
  const canvas = await html2canvas(billElement, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth - 40; // 20pt margin left/right
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = pdfHeight;
  let position = 20;

  // First page
  pdf.addImage(imgData, "PNG", 20, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  // Add extra pages if needed
  while (heightLeft > 0) {
    position = heightLeft - pdfHeight + 40; // reset starting point
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 20, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`bill-${Date.now()}.pdf`);
};

export const whatsappRedirect = async (phone, text) => {
  // Ensure country code is prefixed (e.g., 91 for India)
  let formattedPhone = phone.toString();
  if (!formattedPhone.startsWith("91")) {
    formattedPhone = "91" + formattedPhone;
  }
  const message = encodeURIComponent(text);

  window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
};
