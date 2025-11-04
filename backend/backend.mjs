import Pocketbase from 'pocketbase';
const pb = new Pocketbase('http://127.0.0.1:8090');

export default pb;

export async function listeLunettes() {
    const records = await pb.collection('Lunette').getFullList();
    return records;
};

export async function lunettesParUser(id) {
    const recordsLunettes = await pb.collection('Lunette').getFullList({filter: `id_user = '${id}'`, expand: 'id_mat_m,id_mat_b'});
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