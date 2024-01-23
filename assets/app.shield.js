class Shield {
    constructor() {
        this.id = Date.now() + '' + Math.floor(Math.random() * 1000);

        this.createHTML();
    }

    createHTML() {
        var node = document.createElement('figure');
        node.id = this.id;
        node.classList.add('shield');
        node.style = 'display:inline-block';

        node.innerHTML = 
            '<div class="shield-border"></div>' +
            '<div class="shield-background">' +
                '<div class="shield-board"></div>' +
                '<div class="shield-score"></div>' +
            '</div>' +
            '<figcaption class="shield-ribbon">' +
                '<div class="shield-caption"></div>' +
            '</figcaption>';

        document.getElementById('shields').appendChild(node);
    }
}