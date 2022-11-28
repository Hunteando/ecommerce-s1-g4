const { Type } = require("@sinclair/typebox");
const Ajv = require("ajv");
const addErrors = require("ajv-errors");
const { passwordDTOSchema } = require("./dto-types");

const UpdatePasswordDTOSchema = Type.Object(
  {
    oldPassword: passwordDTOSchema,
    newPassword: passwordDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
    },
  }
);

const ajv = new Ajv({ allErrors: true })
  .addKeyword("kind")
  .addKeyword("modifier");

ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addErrors(ajv);

const validateSchema = ajv.compile(UpdatePasswordDTOSchema);

const userUpdatePasswordDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);

  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });

  next();
};

module.exports = userUpdatePasswordDTO;
