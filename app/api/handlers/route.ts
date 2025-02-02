export async function GET() {
    return new Response("Hello", {
        status: 200,
    });
}

export async function POST() {
    return new Response("Dio Stramaledetto Can", {
        status: 200,
    })   
}