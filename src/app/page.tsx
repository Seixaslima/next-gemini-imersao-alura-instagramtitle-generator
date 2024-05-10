import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>
        Gemini AI
      </h1>
      <Link href="/chat">Chat bot</Link>
    </main>
  );
}
