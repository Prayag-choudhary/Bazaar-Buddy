import cv2
import pytesseract
from gtts import gTTS
import numpy as np
import os
import nltk
nltk.download("words")
from nltk.corpus import words

# Load dictionary words
english_words = set(words.words())

# Set Tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Open webcam
cap = cv2.VideoCapture(1)
prev_text = ""

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convert to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Apply sharpening
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
    gray = cv2.filter2D(gray, -1, kernel)

    # Resize image
    gray_res = cv2.resize(gray, None, fx=1, fy=1, interpolation=cv2.INTER_LINEAR)

    # Extract text using Tesseract
    text = pytesseract.image_to_string(gray_res, lang='eng')

    # Filter only valid words
    words_list = text.split()
    valid_words = [word for word in words_list if word.lower() in english_words]
    filtered_text = " ".join(valid_words)

    # If new text is detected, convert it to speech
    if filtered_text and filtered_text != prev_text:
        print("Detected Text:", filtered_text)

        # Convert to speech using gTTS
        tts = gTTS(filtered_text, lang='en')
        tts.save("output.mp3")
        # os.system("start output.mp3")  # Play the audio file

        prev_text = filtered_text

# Release resources
cap.release()
cv2.destroyAllWindows()
