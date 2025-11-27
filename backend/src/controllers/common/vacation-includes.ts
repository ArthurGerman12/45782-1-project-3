import User from "../../models/User";

const vacationIncludes = {
  include: [
    {
      model: User,
      attributes: ['id', 'firstName', 'lastName'],
      through: { attributes: [] }
    }
  ]
};

export default vacationIncludes;
