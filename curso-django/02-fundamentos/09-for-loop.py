
my_list = [1,2,3,4,5]
addition = 0

for number in my_list:
    addition += number
    
print(addition)

for index,number in enumerate( list( range(0,100) ) ):
    print(index,number*2)
    
print(list(range(1,5)))