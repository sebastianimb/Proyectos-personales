from abc import ABC, abstractmethod


class BankAccount(ABC):
    def __init__(self, owner, initial_balance):
        self.owner = owner
        self.__balance = initial_balance #Encapsulacion
    
    def deposit(self,amount):
        if amount>0:
            self.__balance += amount
    
    def _get_balance(self):
        return self.__balance
    
    def _set_balance(self, new_amount):
        self.__balance = new_amount
    
    @abstractmethod
    def withdraw(self,amount):
        pass # Polimorfismo
        
    def check_balance(self):
        return f'Saldo actual: {self.__balance}'
    
class SavingAccount(BankAccount): #Herencia
    def withdraw(self,amount):
        penalty = amount * 0.05
        total = amount+penalty
        if total <= self._get_balance():
            self._set_balance(self._get_balance() - total)
        else:
            print('Saldo insuficiente en la cuenta de ahorro')
               
class PayrollAcount(BankAccount):
    def withdraw(self,amount):
        if amount <= self._get_balance():
            self._set_balance(self._get_balance() - amount)
        else:
            print('Saldo insuficiente en la cuenta de nomina')

saving_account = SavingAccount('Sebastian', 1000)     
payroll_account = PayrollAcount('Sebastian', 1000)

saving_account.withdraw(100)    
payroll_account.withdraw(100)

print(saving_account.check_balance(), payroll_account.check_balance())
