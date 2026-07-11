const WA_NUMBER = '6281217043425';

const encode = (text) => encodeURIComponent(text.trim());

export const waLink = (template) =>
  `https://wa.me/${WA_NUMBER}?text=${encode(template)}`;

export const WA_TEMPLATES = {
  instagram: waLink(
    `Halo Admin NesaVerse 👋\n\nSaya ingin mendaftarkan akun Instagram saya.\n\nNama:\nUsername:\nKategori:\nLink:\n\nTerima kasih.`
  ),
  tiktok: waLink(
    `Halo Admin NesaVerse 👋\n\nSaya ingin mendaftarkan akun TikTok saya.\n\nNama:\nUsername:\nKategori:\nLink:\n\nTerima kasih.`
  ),
  whatsapp: waLink(
    `Halo Admin NesaVerse 👋\n\nSaya ingin mendaftarkan Channel WhatsApp.\n\nNama:\nNama Channel:\nKategori:\nLink:\n\nTerima kasih.`
  ),
  discord: waLink(
    `Halo Admin NesaVerse 👋\n\nSaya ingin mendaftarkan Server Discord.\n\nNama:\nServer:\nKategori:\nInvite Link:\n\nTerima kasih.`
  ),
  youtube: waLink(
    `Halo Admin NesaVerse 👋\n\nSaya ingin mendaftarkan Channel YouTube.\n\nNama:\nChannel:\nKategori:\nLink:\n\nTerima kasih.`
  ),
  roblox: waLink(
    `Halo Admin NesaVerse 👋\n\nSaya ingin mendaftarkan Game Roblox.\n\nNama:\nNama Game:\nLink Game:\nLink Community (Opsional):\n\nTerima kasih.`
  ),
};
