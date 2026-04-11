import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceData {
  orderId: string;
  date: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discount: number;
  total: number;
  isCOD: boolean;
  advancePaid: number;
  balanceDue: number;
}

export async function generateInvoicePDF(data: InvoiceData, action: "download" | "blob" = "download") {
  const doc = new jsPDF();

  // Branding Typography
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(26, 25, 24); // #1A1918
  doc.text("DESIGNER WORLD", 14, 22);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(156, 150, 144); // #9C9690
  doc.text("NAGPAL GROUP SINCE 1948", 14, 28);

  // Invoice Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(232, 224, 213); // light gold/beige #E8E0D5
  doc.text("INVOICE", 145, 25);

  // Divider Line
  doc.setDrawColor(232, 224, 213);
  doc.setLineWidth(0.5);
  doc.line(14, 38, 196, 38);

  // Metadata Left: Order Info
  doc.setFontSize(10);
  doc.setTextColor(92, 87, 82);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Number:", 14, 50);
  doc.setFont("helvetica", "normal");
  doc.text(data.orderId.toUpperCase(), 14, 55);

  doc.setFont("helvetica", "bold");
  doc.text("Date:", 14, 65);
  doc.setFont("helvetica", "normal");
  doc.text(data.date, 14, 70);

  // Metadata Right: Billed To
  doc.setFont("helvetica", "bold");
  doc.text("Billed To:", 100, 50);
  doc.setFont("helvetica", "normal");
  doc.text(data.customerName, 100, 55);
  if (data.customerEmail) doc.text(data.customerEmail, 100, 60);
  if (data.customerPhone) doc.text(data.customerPhone, 100, 65);
  
  const formattedAddress = doc.splitTextToSize(data.shippingAddress, 90);
  doc.text(formattedAddress, 100, 72);

  // Table Data
  const tableData = data.items.map(item => [
    item.name,
    item.quantity.toString(),
    `Rs. ${item.price.toLocaleString()}`,
    `Rs. ${(item.price * item.quantity).toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 95,
    head: [['Item Description', 'Qty', 'Unit Price', 'Amount']],
    body: tableData,
    theme: 'plain',
    headStyles: { 
      fillColor: [250, 248, 244], 
      textColor: [26, 25, 24], 
      fontStyle: 'bold',
      lineColor: [232, 224, 213],
      lineWidth: { top: 0.5, bottom: 0.5 }
    },
    bodyStyles: {
      textColor: [92, 87, 82]
    },
    columnStyles: {
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' }
    },
    margin: { left: 14, right: 14 }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 15;

  // Breakdown Table (Right Aligned)
  const breakdownX = 135;
  const valX = 196;

  doc.setFontSize(10);
  doc.setTextColor(92, 87, 82);

  // Subtotal
  doc.text("Subtotal:", breakdownX, finalY);
  doc.text(`Rs. ${data.subtotal.toLocaleString()}`, valX, finalY, { align: "right" });

  // Discount
  if (data.discount > 0) {
    doc.text("Discount:", breakdownX, finalY + 7);
    doc.text(`-Rs. ${data.discount.toLocaleString()}`, valX, finalY + 7, { align: "right" });
  }

  // Shipping
  const shippingY = data.discount > 0 ? finalY + 14 : finalY + 7;
  doc.text("Shipping:", breakdownX, shippingY);
  doc.text(data.shippingAmount > 0 ? `Rs. ${data.shippingAmount.toLocaleString()}` : "Free", valX, shippingY, { align: "right" });

  // Tax
  const taxY = shippingY + 7;
  doc.text("Tax (18% GST incl.):", breakdownX, taxY);
  doc.text(`Rs. ${data.taxAmount.toLocaleString()}`, valX, taxY, { align: "right" });

  // Divider above Total
  doc.setLineWidth(0.5);
  doc.setDrawColor(232, 224, 213);
  doc.line(breakdownX, taxY + 4, valX, taxY + 4);

  // Total
  const totalY = taxY + 11;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 25, 24);
  doc.text("Total Amount:", breakdownX, totalY);
  doc.text(`Rs. ${data.total.toLocaleString()}`, valX, totalY, { align: "right" });

  // COD Breakdown
  if (data.isCOD) {
    const pY = totalY + 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(184, 147, 90); // Gold
    doc.text("Advance Paid (Online):", breakdownX, pY);
    doc.text(`Rs. ${data.advancePaid.toLocaleString()}`, valX, pY, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 25, 24);
    doc.text("Balance Due on Delivery:", breakdownX, pY + 7);
    doc.text(`Rs. ${data.balanceDue.toLocaleString()}`, valX, pY + 7, { align: "right" });
  }

  // Footer Message
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(156, 150, 144);
  doc.text("Thank you for shopping with Designer World.", 14, 280);
  
  if (action === "download") {
    doc.save(`Invoice_${data.orderId}.pdf`);
  } else {
    return doc.output("blob");
  }
}
