import { useEffect, useState } from "react";
import { initClient } from '@ts-rest/core';
import { pokemonContract } from "@repo/shared";
import type z from "zod";

const client = initClient(pokemonContract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});

function App() {
  const [data, setData] = useState<z.infer<typeof pokemonContract.getPokemon.responses[200]> | null>(null);

  useEffect(() => {

    client.getPokemon({
      params: { id: '1' },
    }).then(res => {
      console.log(res);
      if (res.status === 200) {1
        setData(res.body);
      } else {
        setData(null);
      }

    });

  }, []);

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export default App
