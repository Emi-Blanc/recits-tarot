// Filtre pratique d'accès à l'espace cours.
// ATTENTION : ceci n'est PAS une sécurité réelle — le contenu de cette
// page reste techniquement téléchargé par le navigateur. C'est un filtre
// qui décourage la consultation occasionnelle et empêche l'indexation
// Google, adapté à du contenu donné à des personnes qui ont payé de
// bonne foi. Pour du contenu à forte valeur commerciale, il faudra à
// terme une vraie plateforme avec authentification côté serveur.
(function () {
    if (sessionStorage.getItem('coursAccess') !== 'ok') {
        window.location.href = 'index.html';
    }
})();
