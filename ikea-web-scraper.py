import requests
import time
from selenium import webdriver
import json


# make this search_query customizeable
search_query = "beds"
url = "https://www.ikea.com/us/en/search/products/?q=" + str(search_query)
products_data = {}
products_data[search_query] = []

def format_product_information(product, products_data):
    if product.get_attribute("data-product-name") != None:
        product_urls = product.find_elements_by_tag_name('a')
        product_url = product_urls[0].get_attribute("href")
        product_information = {
            "name": product.get_attribute("data-product-name"),
            "price": product.get_attribute("data-price"),
            "url": product_url
        }
        products_data[search_query].append(product_information.copy())
        
    
# we need to use web driver/ selenium because ikea loads its products using javascript
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
options.add_argument("headless")
PATH = "chromedriver.exe"
driver = webdriver.Chrome(options=options, executable_path=PATH)
driver.get(url)

time.sleep(2)

last_position = driver.execute_script("return window.pageYOffset;")
done = False
scrolling = True


# while loop simulates the scrolling of the webpage to load the products
while not done:
    if scrolling:
        products = driver.find_elements_by_class_name('serp-grid__item')
        for product in products:
            format_product_information(product, products_data)

    scroll_attempts = 0
    # This While loop scrolls until it can no longer scroll any further and ends the scrolling loop
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        current_position = driver.execute_script("return window.pageYOffset;")
        if last_position == current_position:
            scroll_attempts += 1

            if scroll_attempts >= 3:
                scrolling = False
                done = True
                break
            else:
                time.sleep(2)
        else:
            last_position = current_position
            break

driver.close()

# write data into json format and give file to javascript
json_object = json.dumps(products_data, indent=4, sort_keys=True)
with open(str(search_query) + ".json", "w") as file:
    file.write(json_object)

print("end of program")