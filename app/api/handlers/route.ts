export async function GET() {
    return new Response(JSON.stringify({ message: "Hello from handlers" }), {
        status: 200,
    });
}

export async function POST() {
    return new Response("Dio Stramaledetto Can", {
        status: 200,
    })   
}