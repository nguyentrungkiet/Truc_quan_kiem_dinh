export default async function handler(req, res) {
    const fileId = '1fhLxfebh3PPya8lijurgcoXiuaOe3WYt';
    const url = `https://docs.google.com/uc?export=download&id=${fileId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Lỗi Google Drive: ${response.status}`);
        
        const arrayBuffer = await response.arrayBuffer();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        
        res.status(200).send(Buffer.from(arrayBuffer));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
