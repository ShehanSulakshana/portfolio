document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const resultContainer = document.getElementById("form-result");
    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // 1. Set Loading UI state
        submitBtn.disabled = true;
        btnText.textContent = "Sending...";
        resultContainer.className = "form-result-message";
        resultContainer.textContent = "";

        // 2. Extract and format form inputs
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            // 3. Send AJAX request to Web3Forms API
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });

            const result = await response.json();

            // 4. Render output state
            if (response.status === 200) {
                resultContainer.classList.add("success");
                resultContainer.textContent = "Message sent successfully! I will get back to you shortly.";
                form.reset();
            } else {
                resultContainer.classList.add("error");
                resultContainer.textContent = result.message || "Something went wrong. Please try again.";
            }
        } catch (error) {
            resultContainer.classList.add("error");
            resultContainer.textContent = "Network error. Please check your connection and try again.";
        } finally {
            // 5. Restore submit button state
            submitBtn.disabled = false;
            btnText.textContent = "Send Message";
        }
    });
});