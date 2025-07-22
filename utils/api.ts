export async function fetchIdeas({
  page = 1,
  size = 10,
  sort = '-published_at',
}) {
  const res = await fetch(`/api/ideas?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`);
  if (!res.ok) {
    throw new Error('Failed to fetch ideas');
  }
  return res.json();
}
