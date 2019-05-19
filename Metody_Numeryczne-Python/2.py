import math


"""
Ilość części:
"""
n = 1000

	
"""
Metody:
"""
def rectange_method(function, a, b, n):
	result = 0
	if n == 0:
		return result
	h = (b - a) / n
	for i in range(n):
		result += function(a + (i + 0.5) * h)
	return h * result

def trapezoidal_method(function, a, b, n):
	result = 0
	if n == 0:
		return result
	h = (b - a) / n
	for i in range(1, n):
		result += function(a + i * h)
	return h * (0.5 * function(a) + 0.5 * function(b) + result)

def simpson(function, a, b, n):
	sum1 = 0
	sum2 = 0
	if n == 0:
		return 0
	h = (b - a) / n
	for i in range(n):
		sum1 += function(a + i * h + h/2)
	for i in range(1, n):
		sum2 += function(a + i * h)
	return h / 6 * (function(a) + 4 * sum1 + 2 * sum2 + function(b))
	
	
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
Wyniki:
"""	
print("----------------------------------------------------")

print("calka 1            =" + str(4/3))
print("metoda prostokatow: ", end="")
print(rectange_method(function1, 0, 1, n))
print("metoda trapezow:    ", end="")
print(trapezoidal_method(function1, 0, 1, n))
print("metoda simpsona:    ", end="")
print(simpson(function1, 0, 1, n))

print("----------------------------------------------------")

print("calka 2            ≈0.435059720011447")
print("metoda prostokatow: ", end="")
print(rectange_method(function2, 1, 6, n))
print("metoda trapezow:    ", end="")
print(trapezoidal_method(function2, 1, 6, n))
print("metoda simpsona:    ", end="")
print(simpson(function2, 1, 6, n))

print("----------------------------------------------------")

print("calka 3            ≈13.075820515531339")
print("metoda prostokatow: ", end="")
print(rectange_method(function3, 1, 3, n))
print("metoda trapezow:    ", end="")
print(trapezoidal_method(function3, 1, 3, n))
print("metoda simpsona:    ", end="")
print(simpson(function3, 1, 3, n))

print("----------------------------------------------------")

print("calka 4            ≈−1597.437912434100375")
print("metoda prostokatow: ", end="")
print(rectange_method(function4, 1, 5, n))
print("metoda trapezow:    ", end="")
print(trapezoidal_method(function4, 1, 5, n))
print("metoda simpsona:    ", end="")
print(simpson(function4, 1, 5, n))

print("----------------------------------------------------")