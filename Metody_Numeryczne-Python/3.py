import time


"""
Parametry
"""	

a = 1664525
c = 1013904223
m = 2 ** 32

""""
Zapis do pliku, text_file_plot tworzy pary plików w celu sprawdzenia graicznie
"""

text_file_plot = open("lcg_plot.txt", "w+")


"""
pętla bez rekurencji, by umożliwić więcej wylosowanych punktów
"""
lcg  = int(time.time())%m
first = lcg
lcg = (a*lcg+c)%m
i = 2
while lcg != first:
	lcg = (a*lcg+c)%m
	i = i +1
	
text_file_plot.write(i)	
text_file_plot.close()