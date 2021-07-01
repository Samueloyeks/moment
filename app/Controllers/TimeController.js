const catchAsync = require("../../utils/catchAsync");
const { ZoneId, ZonedDateTime } = require("@js-joda/core");
const { formatTimeString } = require("../Helpers/timeFormats");
const AppError = require("../../utils/appError");

const Zones = {
  CVT: "-1",
  GMT: "",
  WAT: "+1",
  CAT: "+2",
  EAT: "+3",
  MT: "+4",
};
Object.freeze(Zones);

exports.getTime = catchAsync(async (req, res, next) => {
  const { timezone } = req.query;

  if (!Object.keys(Zones).includes(String(timezone))) {
    return next(
      res.status(422).json({
        status: "Invalid Time Zone",
      })
    );
  }

  const specificZone = `UTC${Zones[timezone]}`;
  let zoneDateString = ZonedDateTime.now(ZoneId.of(specificZone)).toString();
  const pattern = /\[.*]/g;
  zoneDateString = zoneDateString.replace(pattern, "");

  return next(
    res.status(200).json({
      status: "success",
      time: formatTimeString(zoneDateString),
    })
  );
});
