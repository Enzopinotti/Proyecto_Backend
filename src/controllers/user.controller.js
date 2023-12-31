import userModel from "../daos/models/user.model.js";
import moment from 'moment';


export const showProfile = (req, res) => {
    const user = req.session.user;

    if (!user) {
      return res.sendUserError({ status: 'error', error: 'User not found' });   
    }

    let birthDateFormated = moment(user.birthDate).add(1, 'day').format('DD/MM/YYYY');

    res.render('profile', { user: { ...user, birthDate: birthDateFormated }, style: 'profile.css' , title: 'Perfil del Usuario'});
};


export const uploadAvatar = async (req, res) => {
  try {
      if (!req.file) {
        return res.status(400).json({ error: 'No se ha seleccionado ningún archivo.' });
      }

      const userId = req.session.user._id;
      const imagePath = `/img/avatars/${req.file.filename}`;

      await userModel.findByIdAndUpdate(userId, { avatar: imagePath });

      req.session.user.avatar = imagePath;

      req.session.save((err) => {
        if (err) {
            console.error('Error al guardar la sesión:', err);
            return res.status(500).json({ error: 'Error al guardar la sesión.' });
        }

        return res.redirect('/profile');
      });
  } catch (error) {
    console.error('Error al subir el avatar:', error);
    return res.status(500).json({ error: 'Error al subir el avatar.' });
  }
};

export const getUsers = async (req, res) => {
    const limit = req.query.limit; // Obtén el límite de usuarios desde los parámetros de consulta
    try {
      const users = await userModel.find();  
      if (limit) {
        const limitedUsers = users.slice(0, limit);
        res.sendSuccess(limitedUsers);
      } else {
        res.sendSuccess(users);
      }
    } catch (error) {
      res.sendServerError(error.message);
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json(user);

    } catch (error) {

      res.status(500).json({ error: error.message });
      
    }
}

export const postUser = async (req, res) => {
  const user = new userModel(req.body);
  try {
      const addedUser = await user.save();
      res.sendSuccess(addedUser);
  } catch (error) {
      res.sendServerError(error.message);
  }
};
export const deleteUser = async (req, res) => {
  const userId = req.params.pid;
  try {
      const result = await userModel.findById(userId);
      const userEliminated = await userModel.deleteOne(result);
      res.sendSuccess(userEliminated);
  } catch (error) {
      res.sendServerError(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
      const updatedUser = await userModel.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!updatedUser) {
          return res.sendNotFound('User not found');
      }
      res.sendSuccess(updatedUser);
  } catch (error) {
      res.sendServerError(error.message);
  }
};