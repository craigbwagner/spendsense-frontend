const BACKEND_URL = `${import.meta.env.VITE_FLASK_BACKEND_URL}/budgets`;

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

const update = async (categoryBudgetsFormData) => {
  try {
    const res = await fetch(`${BACKEND_URL}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryBudgetsFormData),
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

export { index, update }
