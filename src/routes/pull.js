const express=require("express")
const pullRouter=express.Router();
require("dotenv").config();

console.log(process.env.GITHUB_TOKEN)
 pullRouter.get('/api/pull-requests',async (req,res)=>{
    console.log("hi")
    const owner=req.query.owner;
    const repo=req.query.repo;
    const url="https://api.github.com/repos/calcom/cal.com/pulls?state=all"
    const options = {
        method: 'GET',
        headers: {
           'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'User-Agent': 'YOUR_GITHUB_TOKEN',
            'Content-Type': 'application/json',
        }
        };
       
                    
        const response = await fetch(url, options);
          if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: errorText });
          }
      
          const data = await response.json();
          // Return the full PR objects
              console.log(data);
          return res.json(data);
  
      console.log(typeof data)
      
      console.log("bu")
      res.send(data)
                    
})
module.exports = pullRouter;