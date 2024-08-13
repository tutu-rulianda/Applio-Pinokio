module.exports = {
  daemon: true,
  run:[
    {
      id: "start",
      method: "shell.run",
      params: {
        conda: {
          path: "env",
        },
        path: "applio",
        message: [
          "export export PYTORCH_MPS_HIGH_WATERMARK_RATIO=0.0",
          "export PYTORCH_ENABLE_MPS_FALLBACK=1",
          "python app.py",
          # "/bin/bash run-applio.sh",
        ],
        on: [{
          "event": "/http:\/\/\\S+/",   
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    },
    {
      method: "proxy.start",
      params: {
        uri: "{{local.url}}",
        name: "Local Sharing"
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'Open Web UI' button to open the web interface",
      }
    }
  ]
}
