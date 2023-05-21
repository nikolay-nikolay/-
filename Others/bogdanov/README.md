"# AuthModule" 


"# Памятка БД ПРОГЕРА" 

CREATE TABLE user (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

SELECT * FROM user

INSERT INTO user(name) VALUES("Владислав")

DELETE FROM user WHERE name="Элдор"

SELECT users.id, users.name, wallets.balance as balance FROM users LEFT JOIN wallets WHERE wallets.user_id = users.id


"# Памятка tk ПРОГЕРА" 

import tkinter as tk

users_list =  [{
   "name": "Kirill",
   "pass": "Javac"
}]

def auth(name: tk.Entry, passwd: tk.Entry, lbl: tk.Label): 
   for user in users_list:
      if user['name'] == name.get() and user['pass'] == passwd.get():
        lbl.config(text='Вход выполнен')
      else:
         lbl.config(text='Неверные данные')



def reset(lbl: tk.Label): 
   lbl.config(text='')

def draw_ui(window):
   lbl_name = tk.Label(text='Введите ваше имя:')
   lbl_name.grid(column=0, row=0)

   lbl_pass = tk.Label(text='Введите пароль:')
   lbl_pass.grid(column=0, row=1, sticky='w')

   entry_name = tk.Entry(window)
   entry_name.grid(column=1, row=0)

   entry_pass = tk.Entry(window)
   entry_pass.grid(column=1, row=1)

   lbl_success = tk.Label()
   lbl_success.grid(column=2, row=2)

   btn_save = tk.Button(text='Войти', command=lambda: auth(entry_name, entry_pass, lbl_success))
   btn_save.grid(column=0, row=2, sticky='w')

   btn_save = tk.Button(text='Сбросить', command=lambda: reset(lbl_success))
   btn_save.grid(column=1, row=2, sticky='w')



def draw_window():
  window = tk.Tk()
  window.title('learn')

  window.geometry('400x250')

  draw_ui(window)

  window.mainloop()

if __name__ == '__main__':
    draw_window()
