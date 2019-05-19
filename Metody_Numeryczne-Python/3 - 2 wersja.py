import time
import matplotlib.pyplot as plt



"""
Parametry
"""	

a = 1103515245
c = 12345
m = 2 ** 32
x = []
y = []
""""
Zapis do pliku, text_file_plot tworzy pary plików w celu sprawdzenia graicznie
"""

text_file_plot = open("lcg_plot.txt", "w+")
text_file_data = open("lcg_data.txt", "w+")


"""
pętla bez rekurencji, by umożliwić więcej wylosowanych punktów
"""

for i in range(1,1000000001):
	if i==1:
		lcg  = int(time.time())%m
	else:
		lcg = (a*lcg+c)%m	
	
	text_file_plot.write(str(lcg) + ' ')
	text_file_data.write(str(lcg) + '\n')
	if i % 2 == 1:
		x.append(lcg)
	else:
		text_file_plot.write('\n')
		y.append(lcg)
"""
tworzenie wykresów punktów, potrzebna biblioteka Matplotlib
"""		
plt.scatter(x, y)		
plt.grid(True)
plt.xlim(0, 2 ** 33)
plt.ylim(0, 2 ** 33)
plt.xlabel("x")
plt.ylabel("y")
plt.title("LCG)")
plt.savefig("fig1.png", dpi = 72)	
plt.show()	
text_file_plot.close()
text_file_data.close()