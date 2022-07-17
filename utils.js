const axios = require('axios');

exports.callBooksAPI = function (isbn) {
    const url = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&";
    const appid = "applicationId=***REMOVED***&";

    const req_url = url + appid + "isbnjan=" + isbn;
    //console.log(req_url);
    const items = ( async function f() {
                    try {
                        const response = await axios.get(req_url);
                        const items = response.data.Items;
                        //console.log(items)
                        return items;
                        //console.log(response.data.Items);
                        
                    } catch (error) {
                        console.log(error.response.body);
                    }
    })();
    return items;
}