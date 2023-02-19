export const metadata = {
  title: 'Chat'
};

export default async function Page() {
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' });

  return <h1 className="bg-indigo-500">Hello, Next.js!</h1>;
}
