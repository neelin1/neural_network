from matplotlib import pyplot as plt
import pandas as pd
import numpy as np
from flask import Flask, render_template


# USING THE MODEL


def ReLU(Z):
    return np.maximum(Z, 0)


def softmax(Z):
    A = np.exp(Z) / sum(np.exp(Z))
    return A


def forward_prop(W1, b1, W2, b2, X):
    Z1 = W1.dot(X) + b1
    A1 = ReLU(Z1)
    Z2 = W2.dot(A1) + b2
    A2 = softmax(Z2)
    return Z1, A1, Z2, A2


def get_predictions(A2):
    return np.argmax(A2, 0)


def make_predictions(X, W1, b1, W2, b2):
    _, _, _, A2 = forward_prop(W1, b1, W2, b2, X)
    predictions = get_predictions(A2)
    return predictions


def test_prediction(current_image, label, W1, b1, W2, b2):
    prediction = make_predictions(current_image, W1, b1, W2, b2)
    print("Prediction: ", prediction)
    print("Label: ", label)

    current_image = current_image.reshape((28, 28)) * 255
    plt.gray()
    plt.imshow(current_image, interpolation='nearest')
    plt.show()
    return prediction


W1 = np.load('data/w1.npy', None, True)
b1 = np.load('data/b1.npy', None, True)
W2 = np.load('data/w2.npy', None, True)
b2 = np.load('data/b2.npy', None, True)


def prediction(image_array, label):
    return test_prediction(image_array, label, W1, b1, W2, b2)


# # TESTING DATA
# data = pd.read_csv('data/train.csv')

# data = np.array(data)  # converts data to numpy array
# m, n = data.shape
# np.random.shuffle(data)

# # transposes data, switching rows and columns for the first 1000 images in data set
# data_dev = data[0:1000].T
# Y_dev = data_dev[0]  # label is first row
# X_dev = data_dev[1:n]
# X_dev = X_dev / 255.

# data_train = data[1000:m].T  # rest of the data, used for training
# Y_train = data_train[0]  # label is first row
# X_train = data_train[1:n]
# X_train = X_train / 255.
# _, m_train = X_train.shape

# prediction(X_train[:, 0, None], Y_train[0])
# prediction(X_train[:, 1, None], Y_train[1])
# prediction(X_train[:, 2, None], Y_train[2])
# prediction(X_train[:, 3, None], Y_train[3])
# prediction(X_dev[:, 0, None], Y_train[0])
