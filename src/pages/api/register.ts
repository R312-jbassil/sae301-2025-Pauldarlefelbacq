import pb from "../../../backend/backend.mjs";

export const POST = async ({ request, cookies }) => {
    const { email, password, username } = await request.json();
    try {
        const user = await pb.collection("users").create({
            email,
            password,
            passwordConfirm: password,
            username: username || email.split('@')[0],
        });

        // Authentifier automatiquement l'utilisateur après l'inscription
        const authData = await pb.collection("users").authWithPassword(email, password);

        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/", 
            httpOnly: true, 
            sameSite: "strict", 
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

        return new Response(JSON.stringify({ user: authData.record }), { status: 201 });
    } catch (err) {
        console.error("Erreur d'inscription :", err);
        return new Response(JSON.stringify({ error: "Erreur lors de l'inscription" }), { status: 400 });
    }
};