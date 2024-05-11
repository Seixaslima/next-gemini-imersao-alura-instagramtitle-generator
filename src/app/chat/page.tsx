'use client'
import { IHistory } from "@/interface/Igemini";
import { useState } from "react";
import styles from "./chat.module.css"


//pega os dados da api do google
async function getData(prompt: string, history: IHistory[] = []) {
  const res = await fetch('http://localhost:3000/api', {
    headers: {
      prompt: prompt,
      history: JSON.stringify(history)
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}



export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [conversa, setConversa] = useState<IHistory[]>([])


  function papear() {
    if (prompt != "") {
      getData(prompt, conversa)
        .then(resp => {
          return { prompt: resp.prompt, resposta: resp.resposta }
        })
        .then((resp) => {
          setPrompt("")
          const conversaOld = conversa;
          conversaOld.push({ role: "user", parts: [{ text: resp.prompt }] })
          conversaOld.push({ role: "model", parts: [{ text: resp.resposta }] })
          setConversa(conversaOld)
        }
        )
    }
  }

  return (
    <main>
      <section>
        <h1 className={styles.title} >Bora paear</h1>
        <div className={`${styles.chatBox} ${styles.box}`}>

          <p>{JSON.stringify(conversa)}</p>
        </div>
        <div className={`${styles.userBox} ${styles.box}`}>
          <input type="text"  placeholder="Digite o comando" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          <button onClick={papear} >Enviar</button>
        </div>
      </section>

    </main>
  )
}