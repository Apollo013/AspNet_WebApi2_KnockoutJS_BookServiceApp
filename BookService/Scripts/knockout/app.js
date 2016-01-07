var ViewModel = function () {

    var self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();

    var booksuri = '/api/books/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // clear
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksuri, 'GET').done(function (data) {
            self.books(data);
        });
    }


    self.detail = ko.observable();
    self.getBookDetail = function (item) {
        ajaxHelper(booksuri + item.Id, 'GET').done(function (data) { self.detail(data) });
    }

    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author(),
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Title: self.newBook.Title(),
            Year: self.newBook.Year()
        };

        ajaxHelper(booksuri, 'POST', book).done(function (item) {
            self.books.push(item);
            self.detail();
        });
    }



    // AUTHOR
    self.authors = ko.observableArray();
    self.newBook = {
        Author: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable()
    }

    var authorsUri = '/api/authors/';

    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }


    getAuthors();

    getAllBooks();
}

ko.applyBindings(new ViewModel());

