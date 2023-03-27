import { getMessageById, updateMessageById, deleteMessageById } from "@/database";

export default async function handler(req, res) {
    const { messageId } = req.query;

    switch (req.method) {
        case "GET":
            // Get a message by ID
            const message = await getMessageById(messageId);
            if (!message) {
                res.status(404).json({ message: "Message not found" });
                break;
            }
            res.status(200).json(message);
            break;

        case "PUT":
            // Update a message by ID
            const name = req.body.name;
            if (!name) {
                res.status(400).json({ message: "Missing message name" });
                break;
            }
            const updatedMessage = await updateMessageById(messageId, name);
            if (!updatedMessage) {
                res.status(404).json({ message: "Message not found" });
                break;
            }
            res.status(200).json(updatedMessage);
            break;

        case "DELETE":
            // Delete a message by ID
            await deleteMessageById(messageId);
            res.status(204).end();
            break;
        default:
            res.status(405).end();
    }
}