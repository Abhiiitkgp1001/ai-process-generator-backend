
const Process = require('../modals/process');
const axios = require('axios');
exports.createProcess = async (req, res) => {
    try {
      const process = await req.body;
      await Process.create(process).then((createdProcess) => {
          if (!createdProcess) return res.status(404)
            .json({
              success: false,
              message: "Process creation failed",
              error: "Unable to create process"
            })
          res.status(200)
            .json({
              success: true,
              createdProcess
            })
        })
        .catch((error) => {
          res.status(404)
            .json({
              success: false,
              error: error.message
            })
        })
    console.log(req.body);
    } catch (error) {
      res.status(500)
        .json({
          success: false,
          message: "Internal server error"
        })
    }
};
exports.getProcesses = async (req, res) => {
    try {
      await Process.find().then((processes) => {
          if (!processes) return res.status(404)
            .json({
              success: false,
              message: "Failed to get old processes",
              error: "Unable to get processes"
            })
          res.status(200)
            .json({
              success: true,
              processes
            })
        })
        .catch((error) => {
          res.status(404)
            .json({
              success: false,
              error: error.message
            })
        })
    } catch (error) {
      res.status(500)
        .json({
          success: false,
          message: "Internal server error"
        })
    }
};

exports.updateProcess = async (req, res) => {
    try {
        const process = await req.body;

      await Process.findOneAndReplace({_id: req.params.processId},process,{returnDocument : 'after'}).then((processes) => {
          if (!processes) return res.status(404)
            .json({
              success: false,
              message: "Failed to get old processes",
              error: "Unable to get processes"
            })
          res.status(200)
            .json({
              success: true,
              processes
            })
        })
        .catch((error) => {
          res.status(404)
            .json({
              success: false,
              error: error.message
            })
        })
    } catch (error) {
      res.status(500)
        .json({
          success: false,
          message: "Internal server error"
        })
    }
};

exports.createProcessUsingAI = async (req, res) => {
    try {
        const process_name = await req.body.process;
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "user",
                "content": process_name
              }
            ]
          };
          const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.API_KEY}`
          };
        
          const response = await axios.post("https://api.openai.com/v1/chat/completions", data,{headers: headers } )
    
            if(response.status === 200){
                res.status(200)
                .json({
                success: true,
                steps: response.data.choices[0].message.content
                })
            }else{
                res.status(400)
                .json({
                success: false,
                message: "something went wrong"
                })
            }
    } catch (error) {
      res.status(500)
        .json({
          success: false,
          message: "Internal server error"
        })
    }
};