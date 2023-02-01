// EXPRESS: Framework node.js dostarcza zestaw narzędzi i funkcji dla aplikacji webowych.
// ROUTER: Moduł 'EXPRESS' który pozwala na definiowanie metod HTTP (m.in GET, POST, PUT, DELETE)
// EXPRESS-VALIDATOR: Moduł zestawu 'EXPRESS.JS' pozwalający zastosowanie funkcji {check, validationResult} do walidacji danych wprowadzanych do bazy.
// BCRYPT: Biblioteka pozwalająca na haszowanie wprowadzanych haseł przez użytkownika do bazy.
// JSONBTOKEN: 

const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { json } = require("body-parser");



// ************************* METODY POST: USER ****************************** 
/* Pierwszy argument metody POST: 'ENDPOINT do routowania API Usera' -> api/user ... */

router.post("/verify_account", async (req, res, next) => 
{
    const { token, username } = req.body;

    jwt.verify(token, process.env.jwt_key, async (err, valid_token) => 
    {
      if (err) 
      {
        res.json({ status: false , message: `JSON TOKEN ERROR: ${err}`});
        return;
      }
      
      const id = valid_token.id;
      const findAccount = await userModel.findById(id);

      if (!findAccount) 
      {
        res.json({ status: false , message: `FIND ACCOUNT ERROR!`});
        return;
      }
  
      res.json(
        {
            status: true,
            username: findAccount.username,
            email: findAccount.email,
            _id: id
        });
    });
  });

router.post("/login",
    [
        check("username", "Wpisz nazwę użytkownika").not().isEmpty(),
        check("password", "Wpisz hasło").not().isEmpty()
    ],
    async (req, res, next) =>
    {
        const {username, password} = req.body;
        const error = validationResult(req);
        
        if(!error.isEmpty())
        {
            res.json({error: error.array(), error_type: 0});
            return;
        }

        const findOne = await userModel.findOne({username: username});

        if(!findOne)
        {
            res.json({message: "Nieprawidłowa nazwa użytkownika", error_type: 1});
            return;
        }

        await bcrypt.compare(password, findOne.password, (err, isValid) =>
        {
            if (isValid)
            {
                const id = findOne._id;
                const token = jwt.sign({ id }, process.env.jwt_key, {expiresIn: "7d"});

                res
                    .cookie("jwt_token", token)
                    .status(200)
                    .send({message: "Zalogowany", token, created: true, id});
            }
            else
            {
                res.json({message: "Nieprawidłowe konto",error_type: 2, created: false});
            }
        });
    });


router.post("/register",
    [ /* not() - negacja wyniku walidatora, isEmpty() - */
        check("firstname", "Wpisz imię.").not().isEmpty(),
        check("lastname", "Wpisz nazwisko.").not().isEmpty(),
        check("username", "Wpisz nazwę użytkownika.").not().isEmpty(),
        check("email", "Wpisz E-Mail.").not().isEmpty(),
        check("password", "Wpisz hasło.").not().isEmpty(),
        check("password", "Minimalna długość hasła wynosi 6 znaków.").isLength({ min: 6}),
        check("confirm_password", "Potwierdź hasło.").not().isEmpty()
    ],
    async (req, res, next) => 
    {
        const 
        {
            firstname, 
            lastname, 
            username, 
            email, 
            password, 
            confirm_password

        } = req.body; // Dane wysyłane podczas żądania (REQUEST/REQ -> Od Klienta do Serwera)
        
        const error = validationResult(req);

        if(!error.isEmpty())
        {
            res.json({error: error.array(), error_type: 0, created: false});
            return;
        }

        const findOne_userName = await userModel.findOne({ username: username });
        const findOne_email = await userModel.findOne({ email: email });

        /* ============== INSTRUKCJE WARUNKOWE DLA TWORZENIA UZYTKOWNIKA ================= */

        if(findOne_userName)
        {
            res.json({message: "Dany użytkownik już istnieje!", error_type: 1, created: false});
            return;
        }

        if(findOne_email)
        {
            res.json({message: "Ten adres E-Mail jest już używany!", error_type: 1, created: false});
            return;
        }

        if(password !== confirm_password) // Instrukcja która zwraca informacje o błędnym potwierdzeniu hasła
        {
            res.json({message: "Podane hasło nie pasuje!", error_type: 1, created: false});
            return;
        }

        /* -------------------------------------------------------------------- */
        

        // Konstruktor użytkownika: Tworzy dane wprowadzane do bazy
        const user = new userModel(
            {
                firstname,
                lastname,
                email,
                username,
                password,
            }
        );

        const salt = await bcrypt.genSalt(10); // SALTING: Dodawanie ciągu znaku do hashu hasła
        user.password = await bcrypt.hash(user.password, salt); // Hashowanie hasła z Salting'iem 
        
        user.save().then((doc) => // Zapisywanie użytkownika a następnie zwracanie odpowiedzi o sukcesie żadania (201)
        {
            const id = doc._id;
            const token = jwt.sign({id}, process.env.jwt_key, { expiresIn: "7d" });

            res
                .cookie("jwt_token", token)
                .status(201)
                .send({id, created: true, token, message: "Zarejestrowałeś się!"});
        }); 

        //res.json({message: "Success"});
    });

module.exports = router; // Eksport router
