'use strict';

class Publication {

    constructor (item) {
        this.id = item.id;
        this.date = item.date;
        this.body = item.body;
        this.title = item.title;
    }

    getValues() {
        return {
            id: this.id,
            date: this.date,
            body: this.body,
            title: this.title
        };
    }
}

exports.Publication = Publication;