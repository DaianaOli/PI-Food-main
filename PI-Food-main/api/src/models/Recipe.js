const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id : {
      type: DataTypes.UUID,        // este tipo de dato es para que no se repita con el de la API 
      defaultValue: DataTypes.UUIDV4,    
      allowNull: false,
      primaryKey : true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type : DataTypes.TEXT,
      allowNull: false
    },
    healthScore : {
      type: DataTypes.STRING
    },
    analyzedInstructions:{
      type : DataTypes.TEXT,
    },
    createdInDb:{                                  // esta propiedad la van a tenr solo las comidas que esten en la BD
      type : DataTypes.BOOLEAN,                    // por lo que es mas facil buscarlas 
      allowNull: false,
      defaultValue: true
    }

  });
};