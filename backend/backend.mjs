import Pocketbase from 'pocketbase';
const pb = new Pocketbase('http://127.0.0.1:8090');

export default pb;

export async function listeLunettes() {
    const records = await pb.collection('Lunette').getFullList();
    return records;
};

export async function lunettesParUser(id) {
    const records = await pb.collection('Lunette')
}