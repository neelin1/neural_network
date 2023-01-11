from matplotlib import pyplot as plt
import pandas as pd
import numpy as np
from model import forward_prop, get_predictions

# GETTING AND ORGANIZING DATA
data = pd.read_csv('data/train.csv')

data = np.array(data)  # converts data to numpy array
m, n = data.shape
np.random.shuffle(data)

# transposes data, switching rows and columns for the first 1000 images in data set
data_dev = data[0:1000].T
Y_dev = data_dev[0]  # label is first row
X_dev = data_dev[1:n]
X_dev = X_dev / 255.

data_train = data[1000:m].T  # rest of the data, used for training
Y_train = data_train[0]  # label is first row
X_train = data_train[1:n]
X_train = X_train / 255.
_, m_train = X_train.shape

# USING THE MODEL


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


W1 = np.load('data/w1.npy', None, True)
b1 = np.load('data/b1.npy', None, True)
W2 = np.load('data/w2.npy', None, True)
b2 = np.load('data/b2.npy', None, True)

test_prediction(X_train[:, 0, None], Y_train[0], W1, b1, W2, b2)

# test_prediction(0, W1, b1, W2, b2)
# test_prediction(1, W1, b1, W2, b2)
# test_prediction(2, W1, b1, W2, b2)
# test_prediction(3, W1, b1, W2, b2)
# test_prediction(4, W1, b1, W2, b2)
# test_prediction(5, W1, b1, W2, b2)
# test_prediction(6, W1, b1, W2, b2)
