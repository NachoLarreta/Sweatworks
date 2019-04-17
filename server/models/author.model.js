'use strict';

class Author {

    constructor (item) {
        this.id = item.id;
        this.name = item.name;
        this.email = item.email;
        this.dateOfBirth = item.dateOfBirth;
    }

    getValues() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            dateOfBirth: this.dateOfBirth
        };
    }
}

exports.Author = Author;