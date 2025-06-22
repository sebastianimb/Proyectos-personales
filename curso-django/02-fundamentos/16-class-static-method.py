
class Person:
    specie = 'humano'
    
    def __init__(self,name, age):
        self.name = name
        self.age = age
    
    @classmethod
    def change_species(cls,new_specie):
        cls.specie = new_specie
        
    @staticmethod
    def is_older(age):
        return age >= 18
    
        
person1 = Person('Sebastian', 28)
person2 = Person('Patricio', 44)

Person.change_species('reptiliano')
print(person1.specie)
print(person2.specie)

print(Person.is_older(18))
print(person1.is_older(person1.age))