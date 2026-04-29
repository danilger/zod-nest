import { useState } from "react";
import type { FormEvent } from "react";
import { initClient } from '@ts-rest/core';
import { Pokemon, pokemonContract } from "@repo/shared";
import type z from "zod";

const client = initClient(pokemonContract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});

type PokemonDto = z.infer<typeof Pokemon>;

const initialForm: PokemonDto = {
  id: '',
  name: '',
  type: '',
  description: '',
};

function App() {
  const [pokemon, setPokemon] = useState<PokemonDto | null>(null);
  const [lookupId, setLookupId] = useState('025');
  const [deleteId, setDeleteId] = useState('');
  const [form, setForm] = useState<PokemonDto>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoad = async (event: FormEvent) => {
    event.preventDefault();
    if (!lookupId.trim()) {
      setMessage('Укажите id для поиска');
      return;
    }

    setLoading(true);
    setMessage('');
    const response = await client.getPokemon({ params: { id: lookupId.trim() } });
    setLoading(false);

    if (response.status === 200) {
      setPokemon(response.body);
      setForm(response.body);
      setMessage('Покемон загружен');
      return;
    }

    setPokemon(null);
    setMessage('Покемон не найден');
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const response = await client.createPokemon({ body: form });
    setLoading(false);

    if (response.status === 201) {
      setPokemon(response.body);
      setLookupId(response.body.id);
      setDeleteId(response.body.id);
      setMessage('Покемон создан');
      return;
    }

    setMessage('Не удалось создать покемона');
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    if (!lookupId.trim()) {
      setMessage('Сначала укажите id для обновления');
      return;
    }

    setLoading(true);
    setMessage('');
    const response = await client.updatePokemon({
      params: { id: lookupId.trim() },
      body: form,
    });
    setLoading(false);

    if (response.status === 200) {
      setPokemon(response.body);
      setLookupId(response.body.id);
      setDeleteId(response.body.id);
      setMessage('Покемон обновлен');
      return;
    }

    setMessage('Не удалось обновить покемона');
  };

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    if (!deleteId.trim()) {
      setMessage('Укажите id для удаления');
      return;
    }

    setLoading(true);
    setMessage('');
    const response = await client.deletePokemon({ params: { id: deleteId.trim() } });
    setLoading(false);

    if (response.status === 200) {
      if (pokemon?.id === deleteId.trim()) {
        setPokemon(null);
      }
      setMessage('Покемон удален');
      return;
    }

    setMessage('Не удалось удалить покемона');
  };

  return (
    <main style={{ maxWidth: 720, margin: '24px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Pokemon CRUD demo</h1>
      <p style={{ marginTop: 0, color: '#444' }}>
        Пример интерфейса на нативных HTML-элементах с ts-rest контрактом.
      </p>

      <section style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
        <h2 style={{ marginTop: 0 }}>Получить покемона</h2>
        <form onSubmit={handleLoad}>
          <label htmlFor="lookup-id">ID: </label>
          <input
            id="lookup-id"
            value={lookupId}
            onChange={(event) => setLookupId(event.target.value)}
            placeholder="025"
          />
          <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
            Получить
          </button>
        </form>
      </section>

      <section style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
        <h2 style={{ marginTop: 0 }}>Форма покемона</h2>
        <form>
          <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            <label>
              ID
              <input
                value={form.id}
                onChange={(event) => setForm((prev) => ({ ...prev, id: event.target.value }))}
                style={{ width: '100%' }}
              />
            </label>
            <label>
              Name
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                style={{ width: '100%' }}
              />
            </label>
            <label>
              Type
              <input
                value={form.type}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                style={{ width: '100%' }}
              />
            </label>
            <label>
              Description
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
                rows={3}
                style={{ width: '100%' }}
              />
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={handleCreate} disabled={loading}>
                Создать
              </button>
              <button type="button" onClick={handleUpdate} disabled={loading}>
                Обновить по ID из блока "Получить"
              </button>
              <button type="button" onClick={() => setForm(initialForm)} disabled={loading}>
                Очистить форму
              </button>
            </div>
          </fieldset>
        </form>
      </section>

      <section style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
        <h2 style={{ marginTop: 0 }}>Удалить покемона</h2>
        <form onSubmit={handleDelete}>
          <label htmlFor="delete-id">ID: </label>
          <input
            id="delete-id"
            value={deleteId}
            onChange={(event) => setDeleteId(event.target.value)}
            placeholder="025"
          />
          <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
            Удалить
          </button>
        </form>
      </section>

      <p style={{ minHeight: 20 }}>{loading ? 'Загрузка...' : message}</p>

      <section style={{ border: '1px solid #ddd', padding: 12 }}>
        <h2 style={{ marginTop: 0 }}>Текущий объект</h2>
        <pre style={{ margin: 0 }}>{JSON.stringify(pokemon, null, 2)}</pre>
      </section>
    </main>
  );
}

export default App;
