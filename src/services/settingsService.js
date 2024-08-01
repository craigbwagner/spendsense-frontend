const BACKEND_URL = `${import.meta.env.VITE_FLASK_BACKEND_URL}/settings`;

const index = async () => {
  try {
    const res = await fetch(BACKEND_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

const update = async (settingsFormData) => {
  try {
    const res = await fetch(`${BACKEND_URL}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settingsFormData),
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

export { index, update }
