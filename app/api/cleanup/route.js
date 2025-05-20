import { list, del } from '@vercel/blob';

export async function GET() {
  // List all blobs in the specified folder
  const { blobs } = await list({ prefix: 'projectCodeZipArchives/' });

  // Delete each blob
  await Promise.all(blobs.map(blob => del(blob.url)));

  // Respond with the number of deleted blobs
  return new Response(JSON.stringify({ deleted: blobs.length }), { status: 200 });
} 