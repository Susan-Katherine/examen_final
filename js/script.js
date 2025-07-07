document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const barra = document.getElementById("barra-progreso");
  const botonModo = document.getElementById("modo-oscuro");
  const body = document.body;

  // Activar modo oscuro si ya estaba guardado
  if (localStorage.getItem("modo") === "oscuro") {
    body.classList.add("modo-oscuro");
    botonModo.textContent = "☀️ Modo claro";
    botonModo.classList.remove("btn-light");
    botonModo.classList.add("btn-dark");
  }

  // Modo claro / oscuro
  botonModo.addEventListener("click", () => {
    body.classList.toggle("modo-oscuro");
    const modoOscuro = body.classList.contains("modo-oscuro");

    botonModo.textContent = modoOscuro ? "☀️ Modo claro" : "🌙 Cambiar modo";
    botonModo.classList.toggle("btn-dark", modoOscuro);
    botonModo.classList.toggle("btn-light", !modoOscuro);
    localStorage.setItem("modo", modoOscuro ? "oscuro" : "claro");
  });

  // Progreso del formulario
  if (form) {
    form.addEventListener("input", () => {
      const totalCampos = form.querySelectorAll("input, textarea").length;
      let completados = 0;

      form.querySelectorAll("input, textarea").forEach(campo => {
        if (campo.value.trim() !== "") completados++;
      });

      const progreso = (completados / totalCampos) * 100;
      barra.style.width = progreso + "%";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.querySelector("input[type='text']").value.trim();
      const correo = form.querySelector("input[type='email']").value.trim();
      const mensaje = form.querySelector("textarea").value.trim();

      if (!nombre || !correo || !mensaje) {
        alert("❌ Completa todos los campos.");
        return;
      }

      alert("✅ Gracias por inscribirte en el Programa. ¡Pronto recibirás noticias!");
      form.reset();
      barra.style.width = "0%";
    });
  }

  // Modal si lo estás usando
  const abrirModal = document.getElementById("abrir-modal");
  const cerrarModal = document.getElementById("cerrar-modal");
  const modal = document.getElementById("modal-info");

  if (abrirModal && cerrarModal && modal) {
    abrirModal.addEventListener("click", () => modal.style.display = "block");
    cerrarModal.addEventListener("click", () => modal.style.display = "none");
  }

  // Animación scroll para testimonios (si se usan)
  const elementos = document.querySelectorAll('.tarjeta-testimonio');

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('mostrar');
      }
    });
  }, { threshold: 0.3 });

  elementos.forEach(el => observer.observe(el));
});
