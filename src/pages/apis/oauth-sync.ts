import pb from "../../../backend/backend.mjs";

export const POST = async ({ request, cookies }) => {
    const { token } = await request.json();
    
    try {
        // Importer le token OAuth dans le backend
        pb.authStore.save(token);
        
        // Créer le cookie httpOnly comme pour login normal
        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/", 
            httpOnly: true, 
            sameSite: "strict", 
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("Erreur OAuth sync:", err);
        return new Response(JSON.stringify({ error: "Sync failed" }), { status: 500 });
    }
};
