import jsonwebtoken from 'jsonwebtoken';    

export const PRIVATE_KEY = '1010FFF';
export const user = {
  name: "Zézinho silva",
  email: "zezinho@gmail.com"
}

export function tokenValidated(req, res, next) {
    const [,token] = req.headers.authorization?.split(" ") || ["",""];

    if (!token) {
        return res.status(401).send("Acesso Negado. Nenhum token fornecido!");
    }

    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userIdFromToken = typeof payload !== 'string' && payload.user;

        if (!user && !userIdFromToken) {
            return res.send(401).json({message: 'Token invalido'});
        }


        req.headers['user'] = payload.user;

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token invalido'})
    }
}