/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      let currentUser = JSON.parse(User.current());
      let data = {
        mail: currentUser.email,
        password: currentUser.password,
      };
      Account.list(data, (err, response) => {
        let incomeSelect = document.getElementById('income-accounts-list');
        incomeSelect.innerHTML = "";
        let expenseSelect = document.getElementById('expense-accounts-list');
        expenseSelect.innerHTML = "";

        if (response.success === true) {
          for (let item of response.data) {
            let option = document.createElement('option');
            option.setAttribute('value', item.id);
            option.text = item.name;
            incomeSelect.append(option);
          }
          for (let item of response.data) {
            let option = document.createElement('option');
            option.setAttribute('value', item.id);
            option.text = item.name;
            expenseSelect.append(option);
          }
        } else {
          console.log(response.error);
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response?.success === true) {
        App.update();
        let createIncome = App.getModal('newIncome')
        if (createIncome) {
          document.getElementById('new-income-form').reset();
          createIncome.close();
        };
        let createExpense = App.getModal('newExpense')
        if (createExpense) {
          document.getElementById('new-expense-form').reset();
          createExpense.close();
        };
      } else {
        alert(response.error)
      }
    })
  }
}