const menu = document.getElementById('navbar');
const indicator = document.getElementById('indicator');
const container = document.querySelectorAll('.card');

let sizeIndicator = menu.querySelector('a').offsetWidth;
indicator.style.width = sizeIndicator + 'px';

let activeIndexcard;

// Observer
const observer = new IntersectionObserver((inputs, observer) => {
	inputs.forEach(input => {
		if (input.isIntersecting) {
			// Obtenemos cual es la cards que esta entrando en pantalla.
			// console.log(`La input ${input.target.id} esta intersectando`);

			// Creamos un arreglo con las container y luego obtenemos el index del la cards que esta en pantalla.
			activeIndexcard = [...container].indexOf(input.target);
			indicator.style.transform = `translateX(${sizeIndicator * activeIndexcard}px)`;
		}
	});
}, {
	rootMargin: '-80px 0px 0px 0px',
	threshold: 0.2
});

// Agregamos un observador para el startseite.
observer.observe(document.getElementById('startseite'));

// Asignamos un observador a cada una de las container
container.forEach(cards => observer.observe(cards));

// Evento para cuando la pantalla cambie de tamaño.
const onResize = () => {
	// Calculamos el nuevo tamaño que deberia tener el indicador.
	sizeIndicator = menu.querySelector('a').offsetWidth;

	// Cambiamos el tamaño del indicador.
	indicator.style.width = `${sizeIndicator}px`;

	// Volvemos a posicionar el indicador.
	indicator.style.transform = `translateX(${sizeIndicator * activeIndexcard}px)`;
}

window.addEventListener('resize', onResize);