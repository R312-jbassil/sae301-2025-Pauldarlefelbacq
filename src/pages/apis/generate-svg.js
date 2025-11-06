export const POST = async ({ request }) => {
    const { prompt } = await request.json();
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${import.meta.env.OR_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: import.meta.env.NOM_MODEL,
            messages: [
                {
                    role: 'system',
                    content: 'You are an SVG code generator. Generate SVG code for glasses based on the user description. Only return the SVG code,nothing else.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || '';
    const svgMatch = message.match(/<svg[\s\S]*?<\/svg>/i);
    
    return new Response(JSON.stringify({ svg: svgMatch ? svgMatch[0] : '' }), {
        headers: { 'Content-Type': 'application/json' },
    });
};