export default async function handler(req, res) {
    // ID của file Excel trên Google Drive
    const fileId = '16VmyGmbP6NG4IbZd2vx2gg3Eebvgwop-';
    const url = `https://docs.google.com/uc?export=download&id=${fileId}`;

    try {
        // Vercel Server sẽ gọi lên Google Drive (Server-to-Server không bị vướng CORS)
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Google Drive trả về lỗi: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        // Trả dữ liệu về cho Frontend kèm theo header cho phép CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate'); // Cache 60s để web mượt hơn
        
        res.status(200).send(Buffer.from(arrayBuffer));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
