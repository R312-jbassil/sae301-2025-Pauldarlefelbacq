import type { APIContext } from "astro";
import pb from "../../../../backend/backend.mjs";

export const POST = async ({ request, cookies, locals }: APIContext) => {
    if (!locals.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const data = await request.json();
        
        const newGlasses = await pb.collection("Lunette").create({
            Nom: data.Nom,
            prix: data.prix,
            code_SVG: data.code_SVG,
            verres: data.verres,
            branches: data.branches,
            monture: data.monture,
            largeur_pont: data.largeur_pont,
            id_mat_b: data.id_mat_b,
            id_mat_m: data.id_mat_m,
            id_user: locals.user.id
        });

        return new Response(JSON.stringify({ glasses: newGlasses }), { 
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        console.error("Erreur création lunettes:", err);
        return new Response(JSON.stringify({ error: "Erreur lors de la création des lunettes" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const GET = async ({ locals }: APIContext) => {
    if (!locals.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const glasses = await pb.collection("Lunette").getFullList({
            filter: `id_user = '${locals.user.id}'`,
            expand: 'id_mat_m,id_mat_b',
            sort: '-created'
        });

        return new Response(JSON.stringify({ glasses }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        console.error("Erreur récupération lunettes:", err);
        return new Response(JSON.stringify({ error: "Erreur lors de la récupération des lunettes" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
};
