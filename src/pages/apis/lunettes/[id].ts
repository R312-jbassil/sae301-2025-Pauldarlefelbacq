import type { APIContext } from "astro";
import pb from "../../../../backend/backend.mjs";

export const GET = async ({ params, locals }: APIContext) => {
    if (!locals.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const glasses = await pb.collection("Lunette").getOne(params.id!, {
            expand: 'id_mat_m,id_mat_b'
        });

        if (glasses.id_user !== locals.user.id) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        return new Response(JSON.stringify({ glasses }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        console.error("Erreur récupération lunette:", err);
        return new Response(JSON.stringify({ error: "Lunette non trouvée" }), { 
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const PUT = async ({ params, request, locals }: APIContext) => {
    if (!locals.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const existingGlasses = await pb.collection("Lunette").getOne(params.id!);
        if (existingGlasses.id_user !== locals.user.id) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        const data = await request.json();
        
        const updatedGlasses = await pb.collection("Lunette").update(params.id!, {
            Nom: data.Nom,
            prix: data.prix,
            code_SVG: data.code_SVG,
            verres: data.verres,
            branches: data.branches,
            monture: data.monture,
            largeur_pont: data.largeur_pont,
            id_mat_b: data.id_mat_b,
            id_mat_m: data.id_mat_m,
        });

        return new Response(JSON.stringify({ glasses: updatedGlasses }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        console.error("Erreur mise à jour lunettes:", err);
        return new Response(JSON.stringify({ error: "Erreur lors de la mise à jour" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const DELETE = async ({ params, locals }: APIContext) => {
    if (!locals.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const existingGlasses = await pb.collection("Lunette").getOne(params.id!);
        if (existingGlasses.id_user !== locals.user.id) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        await pb.collection("Lunette").delete(params.id!);

        return new Response(JSON.stringify({ success: true }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        console.error("Erreur suppression lunettes:", err);
        return new Response(JSON.stringify({ error: "Erreur lors de la suppression" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
};
