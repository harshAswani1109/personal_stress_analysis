document
  .getElementById("vitalsForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Capture the input data from the form
    const vitalsData = {
      hr: document.getElementById("hr").value,
      resp: document.getElementById("resp").value,
      spo2: document.getElementById("spo2").value,
      temp: document.getElementById("temp").value,
    };

    if (
      !vitalsData.hr ||
      !vitalsData.resp ||
      !vitalsData.spo2 ||
      !vitalsData.temp
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    console.log("Sending data to Flask backend:", vitalsData);
    localStorage.setItem("vitalsData", JSON.stringify(vitalsData));

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vitalsData),
      });

      console.log("Received response from Flask backend", response);

      if (!response.ok) {
        console.log(
          "Network response was not ok",
          response.status,
          response.statusText
        );
        throw new Error("Network response was not ok: " + response.statusText);
      }

      console.log("Parsing JSON response...");

      const result = await response.json();

      console.log("Parsed result:", result);

      if (result.status === "success") {
        document.getElementById("result").textContent =
          "Prediction: " + result.health_status;

        const dassButtonDiv = document.getElementById("dass-button");
        dassButtonDiv.innerHTML = `
          <a href="/dass" class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
            Proceed to DASS Assessment
          </a>
        `;
        dassButtonDiv.classList.remove("hidden");
      } else {
        document.getElementById("result").textContent =
          "Error: " + result.message;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      document.getElementById("result").textContent =
        "Error occurred: " + error.message;
    }
  });
