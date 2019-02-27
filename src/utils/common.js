export async function getObject (url) {
    return await this.$axios.get(url).then((resp) => resp.data);
}