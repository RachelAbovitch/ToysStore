const { decodeToken } = require("../utils/jwt");

exports.auth = (role) => {
    return async function (req, res, next) {
  
       let token = req.headers["Authorization"];
        
        console.log(token);
        if (!token) return res.sendStatus(401);
        token = token.split(" ")[1];
        console.log(token);
        try {
            //הורדת הצפנה לטוקן
            const payload = decodeToken(token);
            //הדפסת התוכן
            console.log(payload);
            //מביא אופציה לבדוק דרגות ניהול
            // if (role && payload._doc.role !== role) return res.sendStatus(401);
            //השמה של ID במשתנה לוקאלי עבור השוואה
            res.locals.userId = payload?._doc?.id;
            next();
        } catch (error) {
            next(error)
        }
    }
}

async function auth1(req, res, next) {
    
    let token = req.headers("x-api-key");
    console.log(token);
    if (!token) return res.sendStatus(401);
    token = token.split(" ")[1];
    console.log(token);
    try {
        const payload = decodeToken(token);
        console.log(payload);
        res.locals.userId = payload?._doc?.id;
        next();
    } catch (error) {
        next(error)
    }
}