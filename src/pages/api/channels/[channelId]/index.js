import {
  getChannelById,
  updateChannelById,
  deleteChannelById,
} from "@/database";

export default async function handler(req, res) {
  const { channelId } = req.query;

  switch (req.method) {
    case "GET":
      // Get a single channel by id
      res
        .status(200)
        .json({
          message: `GET request to /api/channels/${channelId} not implemented yet`,
        });
      break;
    case "PUT":
      // Update a channel by id
      res
        .status(200)
        .json({
          message: `PUT request to /api/channels/${channelId} not implemented yet`,
        });
      break;
    case "DELETE":
      // Delete a channel by id
      res
        .status(200)
        .json({
          message: `DELETE request to /api/channels/${channelId} not implemented yet`,
        });
      break;
    default:
      res.status(405).end();
  }
}
