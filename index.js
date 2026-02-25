import express from 'express'
            import mongoConnect  from './db.js'

            //create expess instance 
            const app= express()

            mongoConnect()

            app.use(express.json())


            //test route
            app.get('/test',(req,res)=>{
                res.send('API is working')
            })

            const PORT=4000

            app.listen(PORT,()=>{
                console.log("server running on port"+ PORT)
            })

            // step to create index.js using ES6 modules
            //1. import express frfom express package
            //2. xreate express instance using express()
            //3. use express json() to parse json body from request 
            //4. creat test route(optional)
            //5. define port number
            //6. listen port using app.listen()