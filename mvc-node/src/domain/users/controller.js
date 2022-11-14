const userModel = require('./model')

//Контроллер внутри себя использует модель
module.exports = {
    getAll: (req, res) => {
        //Рендерим html, и из модели достаем пользователей
        return res.render('users.hbs', {
            users: userModel.getAll()
        })
    },
    create: (req, res) => {
        try {
            const {age, username} = req.body

            if(!age || !username){
                throw new Error('Не указано имя или возраст')
            }

            userModel.create({age, username})

            return res.redirect('/users')
        } catch (e) {
            return res.render('/users-error.hbs', {
                message: e.message
            })
        }
    },
    removeById: (req, res) => {
        try {
            const id = req.query.id

            if(!id){
                throw new Error('id не указан')
            }

            userModel.removeById({id})

            res.render('users-views.hbs', {
                users: userModel.getAll()
            })
        } catch (e) {
            return res.render('users-error.hbs', {
                message: e.message
            })
        }
    }
}