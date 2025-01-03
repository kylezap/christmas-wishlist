export default function getlocalStorage() {
    const token = localStorage.getItem("token");
    return token;
}
