document.getElementById("coffeeForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const kafa = {};
  formData.forEach((value, key) => kafa[key] = value);

  const res = await fetch("/dodaj-kafu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(kafa)
  });

  const result = await res.json();
  document.getElementById("poruka").textContent = result.message;
  if (res.ok) this.reset();
});
