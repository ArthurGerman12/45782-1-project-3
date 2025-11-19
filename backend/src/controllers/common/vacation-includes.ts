import User from "../../models/User";

const vacationIncludes = {
  include: [
    {
      model: User,
      attributes: ['id'],
      through: { attributes: [] }
    }
  ]
};

export default vacationIncludes;
