export default async function handler(req, res) {
  try {
    const backendUrl = 'http://159.223.221.130:3000/api/inference/log';
    const response = await fetch(backendUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ logs: [], error: 'Backend unreachable' });
  }
}
