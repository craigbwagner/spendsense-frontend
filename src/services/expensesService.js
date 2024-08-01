const BACKEND_URL = `${import.meta.env.VITE_FLASK_BACKEND_URL}/expenses`;

async function index() {
  try {
    const res = await fetch(BACKEND_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

async function create(expenseFormData) {
  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseFormData),
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

async function update(expenseId, expenseFormData) {
  try {
    const res = await fetch(`${BACKEND_URL}/${expenseId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseFormData),
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

const deleteExpense = async (expenseId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/${expenseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

export { index, create, update, deleteExpense }
