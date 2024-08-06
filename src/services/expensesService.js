const BACKEND_URL = `${import.meta.env.VITE_FLASK_BACKEND_URL}/expenses`;

const index = async () => {
  try {
    const res = await fetch(BACKEND_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const create = async (expenseFormData) => {
  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseFormData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (expenseId, expenseFormData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/${expenseId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseFormData),
    });
    const updatedExpense = await res.json();
    return updatedExpense;
  } catch (err) {
    console.log(err);
  }
};

const deleteExpense = async (expenseId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/${expenseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
    console.log("error");
  }
};

export { index, create, update, deleteExpense };
