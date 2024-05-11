'use client'
import { IHistory } from "@/interface/Igemini";
import { Box, Button, TextField } from "@mui/material";
import { headers } from "next/headers";
import { useState } from "react";


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
      <h1>Bora paear</h1>
      <Box component='div'>
        <p>{JSON.stringify(conversa)}</p>
      </Box>
      <Box component="div">
        <TextField id="prompt" placeholder="Digite o comando" value={prompt} onChange={(event) => setPrompt(event.target.value)}></TextField>
        <Button variant="contained" onClick={papear} >Enviar</Button>
      </Box>
    </main>
  )
}