import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

image = cv2.imread('20250402_132457.jpg')

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# thresh=cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)
sharp_kernel = cv2.GaussianBlur(gray,(0,0),3)
sharp=cv2.addWeighted(gray,1.5,sharp_kernel,-0.5,0)

gray_res = cv2.resize(sharp,None, fx=1, fy=1, interpolation=cv2.INTER_LINEAR)




text = pytesseract.image_to_string(gray_res, lang='eng')

print("Extracted Text:")
print(text)


data = pytesseract.image_to_data(gray_res, output_type=pytesseract.Output.DICT)

for i in range(len(data['text'])):
    if data['text'][i].strip():  # Ignore empty results
        x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]
        cv2.rectangle(gray_res, (x, y), (x + w, y + h), (0, 255, 0), 2)

cv2.imshow("Detected Text", gray_res)
cv2.waitKey(0)
cv2.destroyAllWindows()
