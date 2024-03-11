/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = { url, data, method, callback }) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url;
    let formData = new FormData();
    if (options.method === 'GET') {
        url = `${options.url}?`
        for (let key in options.data) {
            url += `${key}=${options.data[key]}&`;
        }
    } else {
        if (options.data instanceof FormData) {
            let entries = options.data.entries();
            for (let item of entries) {
                formData.append(item[0], item[1]);
            }
        } else {
            for (let key in options.data) {
                formData.append(key, options.data[key]);
            }
        }
    };

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
        xhr.addEventListener('load', (e) => options.callback(null, xhr.response));
    }
    catch (err) {
        console.log(err);
    };
};
