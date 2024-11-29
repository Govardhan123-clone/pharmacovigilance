export async function POST(request: Request) {
    return new Response("Logged out successfully", {
      status: 200,
      headers: {
        "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0",
      },
    });
  }
  