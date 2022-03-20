const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");

// const findTheatres = async () => {
//   return await Theatre.find({});
// };

// const createShows = async (theatreId) => {
//   try {
//     let theatres = await findTheatres();
//     console.log(theatres);
//     let showNames = ["Morning", "Matniee", "Evening", "Night"];
//     let showTimes = [
//       "10:00AM-1:00PM",
//       "2:00PM-5:00PM",
//       "6:00PM-9:00PM",
//       "10:00PM-1:00AM",
//     ];

//     for (let i = 0; i < theatres.length; i++) {
//       showNames.forEach(async (show, idx) => {
//         const payload = {
//           theatre: theatres[i]._id,
//           name: show,
//           time: showTimes[idx],
//         };
//         await Show.create(payload);
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const createShows = async (theatreId) => {
  try {
    const theatre = await Theatre.findById(theatreId);

    if (theatre.shows && theatre.shows.length > 0) return;

    const showNames = ["Morning", "Matniee", "Evening", "Night"];
    const showTimes = [
      "10:00AM-1:00PM",
      "2:00PM-5:00PM",
      "6:00PM-9:00PM",
      "10:00PM-1:00AM",
    ];

    const createdShows = [];

    for (let i = 0; i < showNames.length; i++) {
      const payload = {
        theatre: theatreId,
        name: showNames[i],
        time: showTimes[i],
      };
      const createdShow = await Show.create(payload);
      createdShows.push(createdShow._id);
    }

    await Theatre.findByIdAndUpdate(theatreId, {
      shows: [...createdShows],
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
module.exports = { createShows };
