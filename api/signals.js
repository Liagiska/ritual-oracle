export default async function handler(req, res) {
  try {
    // Ganti dengan IP VPS kamu yang asli
    const VPS_IP = '159.223.221.130'; 
    const response = await fetch(`http://$159.223.221.130:3000/api/signals/latest`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Backend unreachable', details: error.message });
  }
}
