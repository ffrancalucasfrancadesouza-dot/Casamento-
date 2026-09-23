const momentos = document.querySelectorAll(".momento");

const observador = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visivel");

                observador.unobserve(entrada.target);
            }

        });

    },
    {
        threshold: 0.20
    }
);


momentos.forEach((momento) => {

    observador.observe(momento);

});




