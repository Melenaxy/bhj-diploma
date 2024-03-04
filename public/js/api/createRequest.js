/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = { url, data, method, callback }) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = `${options.url}?`;
    let formData = new FormData();
    if (options.method === 'GET') {
        for (let key in options.data) {
            url += `${key}=${options.data[key]}&`;
            //`abc?prop=значение&login=вфыв&id=123`
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    };

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
        xhr.addEventListener('load', (e) => options.callback(null, xhr.response));
    }
    catch (err) {
        options.callback(err);
    };
};
