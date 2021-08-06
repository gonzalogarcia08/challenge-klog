import Head from "next/head";
import Search from "../components/Photo/Search";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Challenge Klog</title>
        <meta
          name="description"
          content="Prueba técnica de desarrollo web para la empresa Klog, con Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search />
    </div>
  );
}
