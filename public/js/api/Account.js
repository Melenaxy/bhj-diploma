/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET ',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.success) {
          console.log(response);
        } else {
          console.log(err);
        }
        callback(err, response);
      }
    });
  }
}
