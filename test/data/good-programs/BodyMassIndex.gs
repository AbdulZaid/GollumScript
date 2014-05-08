~~ A Body Mass Index function

makeMagic bmi(pounds,inches) 
	it pounds = 155
	it inches = 122
	it KILOGRAM_PER_POUND = 0.45359237 
	it METERS_PER_INCH = 0.0254
	it kilos = pounds * KILOGRAM_PER_POUND
	it inches = inches * METERS_PER_INCH 
	givesUs (kilos / (METERS_PER_INCH * METERS_PER_INCH) ) 
GollumGollum