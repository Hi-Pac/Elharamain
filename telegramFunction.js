
const functions = require("firebase-functions");
const fetch = require("node-fetch");

const TELEGRAM_TOKEN = "8132622542:AAF0nG25doWftQA1-RThLKKEb_HeAATVbOA";
const CHAT_ID = "-4618423800";

exports.notifyTelegram = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snap, context) => {
    const order = snap.data();

    const message = `
📦 *طلب تصنيع جديد!*
👤 *العميل:* ${order.clientName}
📐 *المقاس:* ${order.size || 'غير محدد'}
🔢 *العدد:* ${order.quantity}
📅 *تاريخ التسليم:* ${order.deliveryDate}
🧑‍💼 *تم بواسطة:* ${order.createdBy || order.createdEmail}
📌 *الحالة:* ${order.status || 'قيد الانتظار'}
`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });
  });
