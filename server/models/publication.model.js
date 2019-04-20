'use strict';

class Publication {

    constructor (item) {
        this.id = item.id;
        this.date = item.date;
        this.body = item.body;
        this.title = item.title;
        this.authorId = item.authorId;
    }

    getValues() {
        return {
            id: this.id,
            date: this.date,
            body: this.body,
            title: this.title,
            authorId: this.authorId
        };
    }
}

exports.Publication = Publication;