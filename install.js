module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/IAHispano/Applio applio",
        ]
      }
    },
    {
      method: "shell.run", 
      params: {
        message: "curl -s -LJO https://huggingface.co/IAHispano/applio/resolve/main/env.zip -o env.zip",
        path: "applio"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "applio",
        message: [
          "unzip env.zip",
          "rm env.zip"
        ],
      }
    },
    {
      method: "shell.run",
      params: {
        conda: {
          path: "applio/env",
          python: "python=3.9"
        },
        path: "applio",
        message: [
          "pip install --upgrade setuptools",
          "pip install -r requirements.txt",
          "pip uninstall torch torchvision torchaudio -y",
          "pip install torch==2.1.1 torchvision==0.16.1 torchaudio==2.1.1 --index-url https://download.pytorch.org/whl/cu121",
        ],
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}