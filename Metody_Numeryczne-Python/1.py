import random
import math


"""
Ilość części:
"""
n = 1000000


"""
Metody:
"""
def mc1(function, a, b, h, n):
	k = 0	
	for i in range (1,n):
		x=random.random() * (b - a) + a
		y=random.random() * 2 * h - h
		if y <= function(x) and y > 0:
			k=k+1
		if y > function(x) and y <= 0:
			k=k-1
	return k / n * 2 * h * (b - a)

def mc2(function, a, b, n):
    sum = 0
    for i in range (1,n):
        x = random.random() * (b - a) + a
        sum += function(x)
    return sum / n * (b - a)
	
"""
Funkcje:
"""
def function1(x):
	return x ** 2 + 2 * x

def function2(x):
    return 1 / math.sqrt(x ** 5 + 8)

def function3(x):
    return math.sqrt(x ** 5)

def function4(x):
    return x - 1000 / x

"""
ustalanie h:
"""
def calc_h(function, a, b):
	h = 0
	for x in range (1000 * a, 1000 * b + 1):
		if abs(function(x / 1000)) > h:
			h = float(abs(function(x / 1000)))
	return h	
	
	
"""
Wyniki:
"""	
print("----------------------------------------------------")

print("calka 1            =" + str(4/3))
print("metoda monte carlo 1:    ", end="")
print(mc1(function1, 0, 0.5, calc_h(function1, 0, 1),n))
print("metoda monte carlo 2:    ", end="")
print(mc2(function1, 0, 0.5, n))

print("----------------------------------------------------")

print("calka 2            ≈0.435059720011447")
print("metoda monte carlo 1:    ", end="")
print(mc1(function2, 1, 6, calc_h(function2, 1, 6), n))
print("metoda monte carlo 2:    ", end="")
print(mc2(function2, 1, 6, n))

print("----------------------------------------------------")

print("calka 3            ≈13.075820515531339")
print("metoda monte carlo 1:    ", end="")
print(mc1(function3, 1, 3, calc_h(function3, 1, 3), n))
print("metoda monte carlo 2:    ", end="")
print(mc2(function3, 1, 3, n))

print("----------------------------------------------------")

print("calka 4            ≈−1597.437912434100375")
print("metoda monte carlo 1:    ", end="")
print(mc1(function4, 1, 5, calc_h(function4, 1, 5), n))
print("metoda monte carlo 2:    ", end="")
print(mc2(function4, 1, 5, n))

print("----------------------------------------------------")