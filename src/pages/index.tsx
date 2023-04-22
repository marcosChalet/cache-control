import useSWR from "swr";

const url = "https://api.adviceslip.com/advice/2";

async function getAdvice() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getServerSideProps(context: any) {
  const res = await fetch("https://api.adviceslip.com/advice");
  const advice = await res.json();

  context.res.setHeader("Cache-Control", "public, max-age=86400");

  return {
    props: { advice },
  };
}

export default function Home({ advice }: any) {
  const { data: adviceSWR, error } = useSWR(url, getAdvice);

  if (error) return <div>error...</div>;
  if (!adviceSWR) return <div>loading...</div>;

  return (
    <main>
      <p>{adviceSWR.slip.advice}</p>
    </main>
  );
}
