export default async function handler(req, res) {
  try {
    const VPS_IP = '159.223.221.130'; // GANTI DENGAN IP VPS KAMU
    const response = await fetch(`http://$159.223.221.130:3000/api/signals/latest`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Backend unreachable', details: error.message });
  }
}
