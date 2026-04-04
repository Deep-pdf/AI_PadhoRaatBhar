"""Deterministic practice content keyed by curriculum topic (no AI / external APIs)."""

from typing import Any

PRACTICE_MAP: dict[str, dict[str, Any]] = {
    "NumPy": {
        "questions": [
            "Create a 3x3 NumPy array and calculate its mean",
            "Find the transpose of a matrix",
        ],
        "code": "import numpy as np\narr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(arr.mean())\nprint(arr.T)",
    },
    "Pandas": {
        "questions": [
            "Load a CSV file and drop null values",
            "Group data by a column and calculate mean",
        ],
        "code": "import pandas as pd\ndf = pd.read_csv('file.csv')\ndf = df.dropna()\nprint(df.groupby('col').mean())",
    },
    "Cleaning": {
        "questions": [
            "Remove duplicate rows from a DataFrame",
            "Detect and fill or drop outliers in a numeric column",
        ],
        "code": "import pandas as pd\ndf = pd.read_csv('data.csv')\ndf = df.drop_duplicates()\ndf['age'] = df['age'].fillna(df['age'].median())",
    },
    "Feature Eng": {
        "questions": [
            "One-hot encode a categorical column with pandas",
            "Scale numeric features with StandardScaler before training",
        ],
        "code": "from sklearn.preprocessing import StandardScaler\nimport pandas as pd\nX = pd.get_dummies(df[['cat', 'num']], columns=['cat'])\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)",
    },
    "Visualization": {
        "questions": [
            "Plot a line chart of a time series column",
            "Create a histogram of a numeric feature",
        ],
        "code": "import matplotlib.pyplot as plt\ndf['value'].plot()\nplt.title('Time series')\nplt.show()",
    },
    "Git": {
        "questions": [
            "Create a branch, commit changes, and merge back to main",
            "Inspect history and revert a single bad commit safely",
        ],
        "code": "git checkout -b feature/my-task\ngit add .\ngit commit -m \"WIP\"\ngit checkout main\ngit merge feature/my-task",
    },
    "APIs": {
        "questions": [
            "Send a GET request and parse JSON from the response",
            "POST form data to an endpoint and check status codes",
        ],
        "code": "import requests\nr = requests.get('https://api.example.com/items', timeout=10)\nr.raise_for_status()\ndata = r.json()",
    },
    "FastAPI": {
        "questions": [
            "Define a GET path that returns a JSON dict",
            "Add a path parameter and validate it as an int",
        ],
        "code": "from fastapi import FastAPI\napp = FastAPI()\n\n@app.get('/items/{item_id}')\ndef read_item(item_id: int):\n    return {'item_id': item_id, 'name': 'demo'}",
    },
    "Testing": {
        "questions": [
            "Write a pytest that asserts a pure function output",
            "Use a fixture to share sample data across tests",
        ],
        "code": "import pytest\nfrom mymodule import add\n\ndef test_add():\n    assert add(2, 3) == 5",
    },
    "Docker": {
        "questions": [
            "Write a Dockerfile that runs a Python app on port 8000",
            "Explain the difference between COPY and ADD in a Dockerfile",
        ],
        "code": "FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
    },
    "Regression": {
        "questions": [
            "Train a linear regression model using sklearn",
            "Compare train vs test RMSE for a regression pipeline",
        ],
        "code": "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npreds = model.predict(X_test)",
    },
    "Classification": {
        "questions": [
            "Train a logistic regression classifier and report accuracy",
            "Print a confusion matrix for binary predictions",
        ],
        "code": "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nprint(accuracy_score(y_test, clf.predict(X_test)))",
    },
    "Evaluation": {
        "questions": [
            "Compute precision, recall, and F1 for a classifier",
            "Plot an ROC curve and interpret AUC",
        ],
        "code": "from sklearn.metrics import precision_recall_fscore_support\np, r, f1, _ = precision_recall_fscore_support(y_true, y_pred, average='binary')\nprint(p, r, f1)",
    },
    "Overfitting": {
        "questions": [
            "Explain how train/validation gap indicates overfitting",
            "Apply L2 regularization and compare validation scores",
        ],
        "code": "from sklearn.linear_model import Ridge\nmodel = Ridge(alpha=1.0)\nmodel.fit(X_train, y_train)\nprint(model.score(X_val, y_val))",
    },
    "Project": {
        "questions": [
            "Sketch a minimal folder layout for a small ML repo",
            "List three checkpoints before you call a project 'done'",
        ],
        "code": "# Write your own implementation\n# Tip: keep data/, notebooks/, src/, tests/ separated",
    },
    "Random Forest": {
        "questions": [
            "Train a RandomForestClassifier and report OOB score if enabled",
            "Compare feature importances from a fitted forest",
        ],
        "code": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=200, random_state=42)\nrf.fit(X_train, y_train)\nprint(rf.feature_importances_)",
    },
    "Boosting": {
        "questions": [
            "Train a gradient boosting model with early stopping",
            "Contrast boosting vs bagging in one paragraph",
        ],
        "code": "from sklearn.ensemble import GradientBoostingClassifier\ngb = GradientBoostingClassifier(random_state=42)\ngb.fit(X_train, y_train)",
    },
    "Stacking": {
        "questions": [
            "Describe how a stacking meta-learner combines base models",
            "Train two diverse base estimators before stacking",
        ],
        "code": "from sklearn.ensemble import StackingClassifier\nfrom sklearn.linear_model import LogisticRegression\n# stack = StackingClassifier(estimators=[...], final_estimator=LogisticRegression())",
    },
    "Tuning": {
        "questions": [
            "Run a small grid search over two hyperparameters",
            "Explain why cross-validation reduces lucky splits",
        ],
        "code": "from sklearn.model_selection import GridSearchCV\nparam_grid = {'C': [0.1, 1, 10]}\nsearch = GridSearchCV(estimator, param_grid, cv=5)\nsearch.fit(X, y)",
    },
    "SHAP": {
        "questions": [
            "Explain what SHAP values represent for one prediction",
            "Compare global vs local feature attribution",
        ],
        "code": "# import shap\n# explainer = shap.TreeExplainer(model)\n# shap_values = explainer.shap_values(X_sample)",
    },
    "NN Basics": {
        "questions": [
            "Implement a two-layer MLP forward pass with ReLU",
            "Describe vanishing gradients and one mitigation",
        ],
        "code": "import torch\nimport torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self, d_in, d_h, d_out):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(d_in, d_h), nn.ReLU(), nn.Linear(d_h, d_out)\n        )\n    def forward(self, x):\n        return self.net(x)",
    },
    "PyTorch": {
        "questions": [
            "Train for one epoch: forward, loss, backward, step",
            "Move tensors and model to GPU when available",
        ],
        "code": "import torch\noptimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\nloss_fn = torch.nn.CrossEntropyLoss()\n\nfor xb, yb in loader:\n    optimizer.zero_grad()\n    loss = loss_fn(model(xb), yb)\n    loss.backward()\n    optimizer.step()",
    },
    "CNN": {
        "questions": [
            "Stack Conv2d, ReLU, and MaxPool2d for a tiny classifier",
            "Explain receptive field growth across layers",
        ],
        "code": "import torch.nn as nn\n\nclass TinyCNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.features = nn.Sequential(\n            nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2)\n        )\n    def forward(self, x):\n        return self.features(x)",
    },
    "RNN": {
        "questions": [
            "Use nn.RNN or nn.LSTM on a batch of sequences",
            "Contrast hidden state vs cell state in an LSTM",
        ],
        "code": "import torch.nn as nn\nlstm = nn.LSTM(input_size=64, hidden_size=128, batch_first=True)\nout, (h, c) = lstm(x)",
    },
    "Attention": {
        "questions": [
            "Implement scaled dot-product attention with softmax weights",
            "Relate attention scores to similarity between Q and K",
        ],
        "code": "import torch\nimport torch.nn.functional as F\n\ndef attention(q, k, v):\n    d = q.size(-1)\n    scores = (q @ k.transpose(-2, -1)) / (d ** 0.5)\n    w = F.softmax(scores, dim=-1)\n    return w @ v, w",
    },
    "Transformers": {
        "questions": [
            "Describe encoder self-attention vs decoder masked attention",
            "Explain positional encoding and why order matters",
        ],
        "code": "# Transformer block sketch\n# x = x + self_attn(norm1(x))\n# x = x + ffn(norm2(x))",
    },
    "HuggingFace": {
        "questions": [
            "Load a pretrained tokenizer and encode a batch of strings",
            "Run a small classification head on pooled BERT output",
        ],
        "code": "from transformers import AutoTokenizer\ntok = AutoTokenizer.from_pretrained('bert-base-uncased')\nenc = tok(['hello world', 'practice tab'], padding=True, return_tensors='pt')",
    },
    "Tokenization": {
        "questions": [
            "Compare word-level vs subword tokenization tradeoffs",
            "Tokenize text and map tokens back to string spans",
        ],
        "code": "# Example: inspect tokenizer output\ntokens = tok.tokenize('unhappiness')\nprint(tokens)",
    },
}


def generate_practice(topic: str) -> dict[str, Any]:
    """Return questions and sample code for a topic; generic fallback if unknown."""
    t = (topic or "").strip()
    if t in PRACTICE_MAP:
        entry = PRACTICE_MAP[t]
        return {
            "questions": list(entry["questions"]),
            "code": entry["code"],
        }
    return {
        "questions": [f"Practice basic concepts of {t}"],
        "code": "# Write your own implementation",
    }
