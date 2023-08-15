// rolesMiddleware
module.exports  = (rolesArr) => {
    return  (req, res, next) => { 
        try {
            console.log('req.user', req.user)
            // console.log('req.user', req)
            const roles =  req.user?.roles;
     
            console.log('roles', roles)
            let hasRole = false;
            roles?.forEach((role) => {
              if (rolesArr.includes(role)) {
                hasRole = true;
              }
            });
      
            if (!hasRole) {
              res.status(403);
              throw new Error("Forbidden");
            }
            next();
          } catch (error) {
            console.log('caught')
            res.status(406).json({
              code: 406,
              message: error.message,
            });
          }
    } 
}