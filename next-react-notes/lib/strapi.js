export async function getAllNotes() {
  console.log("[strapi] GET /api/notes");
  const response = await fetch(`http://localhost:1337/api/notes`, {
    cache: "no-store",
    headers: {
      Authorization:
        "bearer 1c504b073e022191c1f011262fbcb8a1a0458d49cc88d56d292891f30962bde89907b58805727882b9f513d40dfd34ea34c1cf66e45f2a30f0c7aa6614e86be01508cf59c2d00adc915643965eca9438e7ad166935b25ac559027edc57f424b9594fe4ae073780685fe0d9a874dc08afb87a66e880f85b08925f6e065a942127",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  const res = {};

  data.data?.forEach(({ id, title, content, slug, updatedAt }) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    });
  });

  return res;
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: "POST",
    headers: {
      Authorization:
        "bearer 1c504b073e022191c1f011262fbcb8a1a0458d49cc88d56d292891f30962bde89907b58805727882b9f513d40dfd34ea34c1cf66e45f2a30f0c7aa6614e86be01508cf59c2d00adc915643965eca9438e7ad166935b25ac559027edc57f424b9594fe4ae073780685fe0d9a874dc08afb87a66e880f85b08925f6e065a942127",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.slug;
}

export async function updateNote(uuid, data) {
  const note = await getNote(uuid);
  if (!note) return;
  const { id } = note;
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization:
        "bearer 9f721e6a6bd6ea9d7b2711cdc9f94839434c02072facee37ff1136a40e46bb3f090d3fe6bbbdc11fae4a44c1be0df2c1eeeb0a5b9ae1217cda14323c73c71008e90d4751664d16ac255639e8215fb4a4aa966bdee2a73bc5d613f4cf71bee801b65fe665e2bb7d677156f630b96859c1ef250148d8151a4c038536fd6fc4af3a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid) {
  const response = await fetch(
    `http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`,
    {
      cache: "no-store",
      headers: {
        Authorization:
          "bearer 9f721e6a6bd6ea9d7b2711cdc9f94839434c02072facee37ff1136a40e46bb3f090d3fe6bbbdc11fae4a44c1be0df2c1eeeb0a5b9ae1217cda14323c73c71008e90d4751664d16ac255639e8215fb4a4aa966bdee2a73bc5d613f4cf71bee801b65fe665e2bb7d677156f630b96859c1ef250148d8151a4c038536fd6fc4af3a",
      },
    },
  );
  const data = await response.json();
  if (!data.data?.length) {
    return null;
  }
  return {
    title: data.data[0].title,
    content: data.data[0].content,
    updateTime: data.data[0].updatedAt,
    id: data.data[0].documentId, // 使用 documentId 作为唯一标识更安全
  };
}

export async function delNote(uuid) {
  const note = await getNote(uuid);
  if (!note) return;
  const { id } = note;
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "bearer 80985bb38cf749e5568e51c637d796c69c7a6b1e820152a1d144369d9b1568b26eae1070a42f06f691febb07a5134b0a5a00e24e69c298b50414f28c3299ead4b05b9f876883020868c5769a726ae5ca02ef31b2a5786efbccfe041b7131e609eb56680a60e38a973dae25d26d1e4ac56e7651d4d1c6a4e1fe7f68999dbb4eed",
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
}
