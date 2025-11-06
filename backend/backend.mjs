import Pocketbase from 'pocketbase';
const pb = new Pocketbase('https://tavu.pauldarlef.fr:443');
pb.autoCancellation(false);
export default pb;

export async function listeLunettes() {
    const records = await pb.collection('Lunette').getFullList();
    return records;
};

export async function lunettesParUser(id) {
    const recordsLunettes = await pb.collection('Lunette').getFullList({
        filter: `id_user = '${id}'`, 
        expand: 'id_mat_m,id_mat_b',
        sort: '-created'
    });
    return recordsLunettes;
};

export async function getMateriauxMonture() {
    const records = await pb.collection('Mat_monture').getFullList();
    return records;
};

export async function getMateriauxBranches() {
    const records = await pb.collection('Mat_branches').getFullList();
    return records;
};

export async function getPanier(id) {
    const records = await pb.collection('PrixTotal').getOne(id);
    return records;
};

export async function getTotal(id) {
    const records = await pb.collection('CountLunetteUser').getOne(id);
    return records;
};