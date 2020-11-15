// Se guarda el html global para ser cargado en todos los demás
const navbar = '<!-- Esta sección es general para todas las vistas (Hay que buscar la manera de exportarla) -->\
\
<!-- Hidden inputs -->\
<input class="hidden" type="checkbox" id="btn-nav-add">\
<input class="hidden" type="checkbox" id="btn-nav-advice">\
<input class="hidden" type="checkbox" id="btn-comment">\
<!-- Barra de navegación -->\
<nav class="navbar navbar-inverse">\
    <ul>\
        <!-- Logo My Movie -->\
        <li class="logo">\
            <label id="logo-button" class="logo-label">My Movie</label>\
            <label class="icon-logo">\
                <span class="fa fa-ticket-alt"></span>\
            </label>\
        </li>\
        <!-- Sección de búsqueda -->\
        <li class="search-icon">\
            <input id="search-bar" type="search" placeholder="Buscar">\
            <label id="search-bar" class="icon nav-icon">\
                <span class="fas fa-search"></span>\
            </label>\
        </li>\
        <!-- Botones de recomendaciones y agregar -->\
        <li class="text-icon">\
            <label for="btn-nav-add" class="icon-text">Agregar película</label>\
            <label for="btn-nav-add" class="icon nav-icon">\
                <span class="fa fa-plus"></span>\
            </label>\
        </li>\
        <li class="text-icon">\
            <label for="btn-nav-advice" class="icon-text">Recomendación</label>\
            <label for="btn-nav-advice" class="icon nav-icon">\
                <span class="fa fa-star"></span>\
            </label>\
        </li>\
    </ul>\
</nav>\
\
\
<!-- Main funtion pages -->\
\
<div class="modal">\
    <!-- Modal para agregar película -->\
    <div class="modal-add">\
        <!-- Header del modal -->\
        <label class="modal-header">\
            <span>Agregar una película</span>\
        </label>\
        <!-- Form con el contenido de la película -->\
        <div class="form-card">\
            <ul class="form-attributes">\
                <label class="form-label">Nombre de película</label>\
                <label class="form-label">Director</label>\
                <input class="form-input" type="text" placeholder="Película">\
                <input class="form-input" type="text" placeholder="Director">\
\
                <label class="form-label">Año</label>\
                <label class="form-label">Calificación comunidad</label>\
                <input class="form-input" type="number" min="0" placeholder="Año">\
                <input class="form-input" type="number" min="0" max="10" placeholder="Calificación">\
\
                <label class="form-label">Nota IMDB</label>\
                <label class="form-label">Calificación personal</label>\
                <input class="form-input" type="number" min="0" max="10" placeholder="Nota">\
                <input class="form-input" type="number" min="0" max="10" placeholder="Metascore">\
\
                <label class="form-label">Género</label>\
                <label class="form-label">Idioma</label>\
                <select class="form-input">\
                    <option *ngFor="let item of list" [value]="item">Género</option>\
                </select>\
                <select class="form-input">\
                    <option *ngFor="let item of list" [value]="item">Idioma</option>\
                </select>\
\
                <label class="form-label">Estilo</label>\
                <label class="form-label">Imagen</label>\
                <select class="form-input">\
                    <option *ngFor="let item of list" [value]="item">Estilo</option>\
                </select>\
                <div class="form-input">\
                    <input type="file" id="movie-image" class="file-input">\
                    <label for="movie-image" class="icon">\
                        Subir archivo\
                        <span class="fa fa-upload"></span>\
                    </label>\
                </div>\
            </ul>\
        </div>\
        <!-- Footer (Botones) -->\
        <ul class="modal-buttons">\
            <label for="btn-nav-add" id="btn-accept-movie" class="icon btn-ok">Agregar</label>\
            <label for="btn-nav-add" id="btn-cancel-movie" class="icon btn-wrong">Cancelar</label>\
        </ul>\
    </div>\
    <!-- Modal de Recomendaciones -->\
    <div class="modal-advice">\
        <label class="modal-header">\
            <span>Solicitar Recomendación</span>\
        </label>\
        <!-- Form para solicitar el los atributos -->\
        <div class="form-card">\
            <ul class="form-attributes">\
                <label class="form-label">Nombre de película</label>\
                <label class="form-label">Director</label>\
                <input class="form-input" type="text" placeholder="Película">\
                <input class="form-input" type="text" placeholder="Director">\
\
                <label class="form-label">Año</label>\
                <label class="form-label">Calificación comunidad</label>\
                <input class="form-input" type="number" min="0" placeholder="Año">\
                <input class="form-input" type="number" min="0" max="10" placeholder="Calificación">\
            </ul>\
        </div>\
        <!-- Footer -->\
        <ul class="modal-buttons">\
            <label for="btn-nav-advice" id="btn-accept-movie" class="icon btn-ok">Me siento con suerte</label>\
            <label for="btn-nav-advice" id="btn-cancel-movie" class="icon btn-wrong">Cancelar</label>\
        </ul>\
    </div>\
    <!-- Modal para agregar comentarios -->\
    <div class="modal-comment">\
        <label class="modal-header">Agregar comentario</label>\
        <!-- "Body" del comentario -->\
        <div class="comment-content">\
            <label>\
                <label class="form-label">Nota</label>\
                <select id="user-grade" class="form-input">\
                    <option value="0">0</option>\
                    <option value="1">1</option>\
                    <option value="2">2</option>\
                    <option value="3">3</option>\
                    <option value="4">4</option>\
                    <option value="5">5</option>\
                    <option value="6">6</option>\
                    <option value="7">7</option>\
                    <option value="8">8</option>\
                    <option value="9">9</option>\
                    <option value="10">10</option>\
                </select>\
            </label>\
            <textarea type="text" id="user-comment" class="form-input user-comment"></textarea>\
        </div>\
        <!-- Footer -->\
        <ul class="modal-buttons">\
            <label for="btn-comment" id="btn-add-comment" class="icon btn-ok">Comentar</label>\
            <label for="btn-comment" id="btn-cancel-comment" class="icon btn-wrong">Cancelar</label>\
        </ul>\
    </div>\
</div>';

document.getElementById("global-nav-bar").innerHTML = navbar;