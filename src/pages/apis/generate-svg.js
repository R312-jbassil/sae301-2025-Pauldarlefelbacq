export const POST = async ({ request }) => {
    const { prompt } = await request.json();
    
    console.log('[SVG Generator] Prompt reçu:', prompt);
    console.log('[SVG Generator] OR_TOKEN présent:', !!import.meta.env.OR_TOKEN);
    console.log('[SVG Generator] Model:', import.meta.env.NOM_MODEL);
    
    try {
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

        console.log('[SVG Generator] OpenRouter status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('[SVG Generator] OpenRouter error:', errorText);
            return new Response(JSON.stringify({ svg: '', error: `OpenRouter error: ${response.status}` }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await response.json();
        console.log('[SVG Generator] Response data:', JSON.stringify(data).substring(0, 200));
        
        const message = data.choices?.[0]?.message?.content || '';
        console.log('[SVG Generator] Message length:', message.length);
        
        const svgMatch = message.match(/<svg[\s\S]*?<\/svg>/i);
        console.log('[SVG Generator] SVG found:', !!svgMatch);
        
        return new Response(JSON.stringify({ svg: svgMatch ? svgMatch[0] : '' }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('[SVG Generator] Error:', error);
        return new Response(JSON.stringify({ svg: '', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};