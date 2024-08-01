const BACKEND_URL = import.meta.env.VITE_FLASK_BACKEND_URL;

async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};
