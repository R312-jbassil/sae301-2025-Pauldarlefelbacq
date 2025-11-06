import pb from "../../../backend/backend.mjs";

export const POST = async ({ request, cookies }) => {
    const { token, user } = await request.json();
    
    try {
        pb.authStore.save(token, user);
        
        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/", 
            httpOnly: true, 
            sameSite: "strict", 
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("Erreur OAuth sync:", err);
        return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
    }
};
