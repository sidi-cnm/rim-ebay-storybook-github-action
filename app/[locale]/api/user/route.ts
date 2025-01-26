import usersData from './data.json';

export async function GET(request: Request) {
  return new Response(JSON.stringify(usersData), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
