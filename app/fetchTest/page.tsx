export default async function fetchTest() {
    const response = await fetch("http://localhost:3000/api/handlers");
    const data = await response.json();
    return <h1>{data.message}</h1>
}