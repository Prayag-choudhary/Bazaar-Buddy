import cv2
import pytesseract
import pyttsx3
import nltk
nltk.download("words")
from nltk.corpus import words

english_words = set(words.words())
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
engine=pyttsx3.init()
engine.setProperty("rate", 150)

cap = cv2.VideoCapture(1)
prev_text=""
while True:
    ret, frame = cap.read()
    if not ret:
        break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # thresh=cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)
    sharp_kernel = cv2.GaussianBlur(gray,(0,0),3)
    sharp=cv2.addWeighted(gray,1.5,sharp_kernel,-0.5,0)

    gray_res = cv2.resize(sharp,None, fx=1, fy=1, interpolation=cv2.INTER_LINEAR)

    text = pytesseract.image_to_string(gray_res, lang='eng')

    words_list = text.split()
    valid_words = [word for word in words_list if word.lower() in english_words]

    filtered_text = " ".join(valid_words)

    if filtered_text and filtered_text != prev_text:
        print("Detected Text:", filtered_text)
        engine.say(filtered_text)
        engine.runAndWait()
        prev_text = filtered_text


    data = pytesseract.image_to_data(gray_res, output_type=pytesseract.Output.DICT)

    for i in range(len(data['text'])):
        if data['text'][i].strip():
            x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]
            cv2.rectangle(gray_res, (x, y), (x + w, y + h), (0, 255, 0), 2)
    cv2.imshow("Detected Text", gray_res)
    if cv2.waitKey(20) & 0xff==ord('q'):
        break
cap.release()
cv2.destroyAllWindows()