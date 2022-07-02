const db=require("../config/database");

class Authorization {

    login=async(req, res)=>{
        const username=req.body.username;
        const password=req.body.password
        if(!username || !password){
            return res.status(200).json({
                "code": 400,
                "message": "Some information is missing"
            });
        }
        const response = await db.query(
            "SELECT * FROM usr WHERE username=$1 and password=$2", [req.body.username, req.body.password]
        );
        res.status(200).send(response.rows);
    }

    register=async (req, res)=>{
        const username=req.body.username;
        if(!username){
            return res.status(200).json({
                "code": 400,
                "message": "Some information is missing"
            });
        }
        const response = await db.query(
            "SELECT * FROM usr WHERE username=$1", [username]
        );
        if(response.rows.length==0){
            
            const password=req.body.password;
            const fullname=req.body.fullname;
            const phoneNumber=req.body.phoneNumber;
            const email=req.body.email;
            if(!username || !password || !fullname || !phoneNumber || !email){
                return res.status(200).json({
                    "code": 400,
                    "message": "Some information is missing"
                });
            }
            const insertResponse = await db.query(
                "INSERT INTO usr (username, password, fullname, email, phoneNumber) VALUES ($1, $2, $3, $4, $5)", [username, password, fullname, email, phoneNumber]
            );
            // console.log(insertResponse.rows);
            return res.status(200).json({
                "code": 0,
                "message": "Successful."
            });
        }
        res.status(200).json({
            "code": 400,
            "message": "Username is already used by other user"
        });
    }

}

module.exports= new Authorization();